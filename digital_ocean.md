1. Create new project
2. Manage > Droplets
3. Create Droplet
    - Region: New York
    - Datacenter: New York Data Center 1 NYC1
    - OS: Ubuntu
    - Version: 24.04 (LTS) x64
    - Size: Basic
    - CPU Options: Regular Disk type: ssd
    - $4 a month
    - Authentication method: SSH Key
        - Run ssh-keygen on local machine
        - This will generate two files, by default called id_rsa and id_rsa.pub. Next, add this public key.
        - Copy and paste the contents of the .pub file, typically id_rsa.pub, into the SSH key content field on the left.: cat ~/.ssh/id_rsa.pub
    - Quantity: 1 Droplet
    - Project: react-blog
    

ssh into digital ocean droplet

ssh root@<ipv4>

sudo apt update

sudo apt install nodejs npm

confirm:
    - node -v
    - npm -v

git clone https://github.com/loganphillips792/react-flask-custom-blog.git
cd react-flask-custom-blog/frontend/react-flask-custom-blog

npm install

npm run build

npm install -g serve

serve -s build




npm run build - prepare app for production. This creates a build/ directory with the production-ready files

