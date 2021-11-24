---
layout: post
title:  "AKS Deployment Center"
categories: azure
---

# What is Azure Kubernetes Service Deployment Center?

Deployment Center is a feature of AKS that helps you to deploy our containers via Dockerfile rather than creating a specific .YAML deployment file

# Simple Dockerfile for demonstration

```Dockerfile

FROM nginx:alpine
COPY _site /usr/share/nginx/html

```
The code above is the Dockerfile for this blog. While being simple, it copies the static site content and will serve it over NGINX via container.

