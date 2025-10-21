#!/bin/bash

# EC2 Deployment Script for React Ecommerce Project

echo "🚀 Starting deployment..."

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Build and run the application
docker build -f Dockerfile.prod -t ecommerce-app .
docker stop ecommerce-container 2>/dev/null || true
docker rm ecommerce-container 2>/dev/null || true
docker run -d --name ecommerce-container -p 80:80 ecommerce-app

echo "✅ Deployment complete! Your app is running on port 80"
echo "🌐 Access your app at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"