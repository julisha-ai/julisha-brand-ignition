import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Download } from "lucide-react";
import SEO from "@/components/SEO";

interface NewsletterSubscriber {
  id: string;
  email: string;
  status: string;
  subscribed_at: string;
  unsubscribed_at?: string;
  source?: string;
}

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch newsletter subscribers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleUnsubscribe = async (id: string) => {
    if (!confirm('Are you sure you want to unsubscribe this email?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ 
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscriber has been unsubscribed",
      });
      
      fetchSubscribers();
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe subscriber",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this subscriber?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscriber has been deleted",
      });
      
      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  const exportSubscribers = () => {
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');
    const csvContent = [
      'Email,Subscribed Date,Source',
      ...activeSubscribers.map(sub => 
        `${sub.email},${new Date(sub.subscribed_at).toLocaleDateString()},${sub.source || ''}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${activeSubscribers.length} active subscribers`,
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = subscribers.filter(sub => sub.status === 'active').length;
  const unsubscribedCount = subscribers.filter(sub => sub.status === 'unsubscribed').length;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Newsletter Management"
        description="Manage newsletter subscribers"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Newsletter Management</h1>
          <p className="text-muted-foreground">Manage newsletter subscribers and export lists</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Unsubscribed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{unsubscribedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subscriber Management</CardTitle>
            <CardDescription>Search, filter, and export newsletter subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={exportSubscribers}
                disabled={activeCount === 0}
                className="sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Active ({activeCount})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading subscribers...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Subscribed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">{subscriber.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={subscriber.status === 'active' ? 'default' : 'secondary'}
                          >
                            {subscriber.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscriber.source || '-'}</TableCell>
                        <TableCell>
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {subscriber.status === 'active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnsubscribe(subscriber.id)}
                              >
                                Unsubscribe
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(subscriber.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredSubscribers.length === 0 && !isLoading && (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'No subscribers found matching your search' : 'No subscribers yet'}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsletterManagement;