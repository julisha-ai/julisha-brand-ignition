// Service Worker for handling incoming webhook requests
self.addEventListener('fetch', function(event) {
  // Only handle POST requests to webhook URLs
  if (event.request.url.includes('/api/webhooks/blog/') && event.request.method === 'POST') {
    event.respondWith(
      event.request.text().then(body => {
        // Forward the webhook data to the main thread
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            try {
              const postData = JSON.parse(body);
              client.postMessage({
                type: 'incoming_blog_post',
                post: postData
              });
            } catch (e) {
              console.error('Failed to parse webhook data:', e);
              client.postMessage({
                type: 'webhook_error',
                error: 'Invalid JSON data'
              });
            }
          });
          
          // Return success response
          return new Response(JSON.stringify({
            success: true,
            message: 'Blog post webhook received and processed'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          });
        });
      }).catch(error => {
        // Return error response
        return new Response(JSON.stringify({
          success: false,
          message: 'Failed to process webhook data',
          error: error.message
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      })
    );
  }
});

// Handle CORS preflight requests
self.addEventListener('fetch', function(event) {
  if (event.request.method === 'OPTIONS' && event.request.url.includes('/api/webhooks/blog/')) {
    event.respondWith(
      new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    );
  }
});