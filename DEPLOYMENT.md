# EC2 Deployment Guide

## Quick Deploy Steps:

### 1. Launch EC2 Instance
- Choose **Amazon Linux 2** AMI
- Instance type: **t2.micro** (free tier)
- Security Group: Allow **HTTP (80)** and **SSH (22)**

### 2. Connect to EC2
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### 3. Upload Project
```bash
# Option A: Using SCP
scp -i your-key.pem -r ecommerce_project ec2-user@your-ec2-ip:~/

# Option B: Using Git
git clone your-repo-url
cd ecommerce_project
```

### 4. Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. Access Your App
Visit: `http://your-ec2-public-ip`

## Manual Steps (Alternative):

```bash
# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo usermod -a -G docker ec2-user

# Build and run
docker build -f Dockerfile.prod -t ecommerce-app .
docker run -d -p 80:80 --name ecommerce-container ecommerce-app
```

## Using Docker Compose:
```bash
docker-compose up -d
```

## Troubleshooting:
- Check logs: `docker logs ecommerce-container`
- Restart: `docker restart ecommerce-container`
- Security Group must allow port 80