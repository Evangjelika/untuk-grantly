# TODO: Deploy BraveVerse Website to VPS

## Preparation on Local Machine
- [ ] Create .env file with Midtrans keys
- [ ] Update package.json to use server.js as main
- [ ] Ensure all dependencies are installed (npm install)
- [ ] Compress project files for transfer

## Transfer to VPS
- [ ] Use SCP to transfer files to VPS (root@103.146.203.116)
- [ ] Extract files on VPS

## Setup on VPS
- [ ] Install Node.js and npm if not present
- [ ] Run npm install on VPS
- [ ] Start the server (node server.js)
- [ ] Configure firewall to allow port 3000

## Web Server Configuration
- [ ] Install Nginx
- [ ] Configure Nginx to serve static files and proxy to Express app
- [ ] Setup domain braveverse.my.id in Nginx config

## SSL Setup
- [ ] Install certbot
- [ ] Obtain SSL certificate for braveverse.my.id
- [ ] Configure Nginx to use HTTPS

## Testing
- [ ] Test website access via https://braveverse.my.id
- [ ] Test payment integration
- [ ] Verify all features work

## Final Steps
- [ ] Set up PM2 for process management (optional)
- [ ] Monitor server logs
- [ ] Update DNS if needed
