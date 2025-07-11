import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, Search, Eye, Calendar, Building, Mail, Phone, Target, DollarSign, Clock, Zap } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  business_size?: string;
  current_challenges?: string;
  goals?: string;
  budget_range?: string;
  timeline?: string;
  additional_info?: string;
  recommendations?: string;
  created_at: string;
  updated_at: string;
}

const formatRecommendations = (text: string) => {
  if (!text) return "";
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/###\s*(.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-primary">$1</h3>')
    .replace(/##\s*(.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3 text-primary">$1</h2>')
    .replace(/#\s*(.*)/g, '<h1 class="text-2xl font-bold mt-8 mb-4 text-primary">$1</h1>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br/>')
    .replace(/^(.*)/, '<p class="mb-3">$1</p>');
};

export default function LeadsManagement() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      setUser(session.user);
      fetchLeads();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/login");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.industry && lead.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              BrandWise Leads Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage leads and recommendations generated from the BrandWise AI intelligence platform
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">{user?.email}</span>
            <Button variant="outline" onClick={() => navigate("/admin")} size="sm">
              Back to Dashboard
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                BrandWise Leads ({filteredLeads.length})
              </span>
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Company</TableHead>
                    <TableHead className="hidden lg:table-cell">Industry</TableHead>
                    <TableHead className="hidden md:table-cell">Business Size</TableHead>
                    <TableHead className="hidden lg:table-cell">Budget Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                          {lead.phone && (
                            <div className="text-sm text-muted-foreground md:hidden">{lead.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {lead.company || "-"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {lead.industry || "-"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {lead.business_size || "-"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {lead.budget_range || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={lead.recommendations ? "default" : "secondary"}>
                          {lead.recommendations ? "Complete" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden md:inline ml-1">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Lead Details - {selectedLead?.name}</DialogTitle>
                            </DialogHeader>
                            {selectedLead && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Contact Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div><strong>Name:</strong> {selectedLead.name}</div>
                                      <div><strong>Email:</strong> {selectedLead.email}</div>
                                      {selectedLead.phone && (
                                        <div><strong>Phone:</strong> {selectedLead.phone}</div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Building className="h-5 w-5" />
                                        Business Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div><strong>Company:</strong> {selectedLead.company || "Not specified"}</div>
                                      <div><strong>Industry:</strong> {selectedLead.industry || "Not specified"}</div>
                                      <div><strong>Business Size:</strong> {selectedLead.business_size || "Not specified"}</div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Business Needs
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      {selectedLead.current_challenges && (
                                        <div>
                                          <strong>Current Challenges:</strong>
                                          <p className="text-sm text-muted-foreground mt-1">{selectedLead.current_challenges}</p>
                                        </div>
                                      )}
                                      {selectedLead.goals && (
                                        <div>
                                          <strong>Goals:</strong>
                                          <p className="text-sm text-muted-foreground mt-1">{selectedLead.goals}</p>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Project Details
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div><strong>Budget Range:</strong> {selectedLead.budget_range || "Not specified"}</div>
                                      <div><strong>Timeline:</strong> {selectedLead.timeline || "Not specified"}</div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">Created: {new Date(selectedLead.created_at).toLocaleString()}</span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {selectedLead.additional_info && (
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg">Additional Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-sm">{selectedLead.additional_info}</p>
                                    </CardContent>
                                  </Card>
                                )}

                                {selectedLead.recommendations && (
                                  <Card>
                                     <CardHeader className="pb-3">
                                       <CardTitle className="text-lg flex items-center gap-2">
                                         <Zap className="h-5 w-5 text-primary" />
                                         BrandWise AI Recommendations
                                       </CardTitle>
                                     </CardHeader>
                                    <CardContent>
                                      <div 
                                        className="prose prose-sm max-w-none text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ 
                                          __html: formatRecommendations(selectedLead.recommendations) 
                                        }}
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No leads found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}