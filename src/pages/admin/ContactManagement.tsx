import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone, Building, DollarSign, MessageSquare, Eye, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      fetchContacts();
    };

    checkAuth();
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch contact submissions",
          variant: "destructive",
        });
        return;
      }

      setContacts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchContacts();
    }
  }, [statusFilter]);

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update contact status",
          variant: "destructive",
        });
        return;
      }

      setContacts(prev => 
        prev.map(contact => 
          contact.id === id 
            ? { ...contact, status: newStatus, updated_at: new Date().toISOString() }
            : contact
        )
      );

      toast({
        title: "Status Updated",
        description: "Contact status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'contacted':
        return <Mail className="w-4 h-4" />;
      case 'qualified':
        return <CheckCircle className="w-4 h-4" />;
      case 'converted':
        return <DollarSign className="w-4 h-4" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return "bg-yellow-100 text-yellow-800";
      case 'contacted':
        return "bg-blue-100 text-blue-800";
      case 'qualified':
        return "bg-purple-100 text-purple-800";
      case 'converted':
        return "bg-green-100 text-green-800";
      case 'closed':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBudgetDisplay = (budget: string | null) => {
    if (!budget) return "Not specified";
    
    const budgetMap: { [key: string]: string } = {
      "under-10k": "Under $10,000",
      "10k-25k": "$10,000 - $25,000",
      "25k-50k": "$25,000 - $50,000",
      "50k-100k": "$50,000 - $100,000",
      "over-100k": "$100,000+",
      "discuss": "Let's Discuss"
    };
    
    return budgetMap[budget] || budget;
  };

  const getServiceDisplay = (service: string | null) => {
    if (!service) return "Not specified";
    
    const serviceMap: { [key: string]: string } = {
      "smart-agents": "Smart Agents",
      "conversational-ai": "Conversational AI",
      "brand-management": "Brand Management",
      "ai-consulting": "AI Consulting",
      "web-development": "Web Development",
      "multiple": "Multiple Services",
      "consultation": "General Consultation"
    };
    
    return serviceMap[service] || service;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Contact Management</h1>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by status:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contact List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{contact.name}</span>
                      <Badge className={getStatusColor(contact.status)}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1 capitalize">{contact.status}</span>
                      </Badge>
                    </CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${contact.email}`} className="hover:text-primary">
                          {contact.email}
                        </a>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${contact.phone}`} className="hover:text-primary">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {contact.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={contact.status} 
                      onValueChange={(value) => updateContactStatus(contact.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Service Interest</label>
                    <p className="mt-1">{getServiceDisplay(contact.service)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                    <p className="mt-1">{getBudgetDisplay(contact.budget)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="mt-1">{new Date(contact.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{contact.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {contacts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {statusFilter === "all" ? "No contact submissions yet" : `No ${statusFilter} contacts`}
              </h3>
              <p className="text-muted-foreground">
                Contact form submissions will appear here when customers reach out.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}