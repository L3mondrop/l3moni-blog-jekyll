---
layout: post
title:  "Introduction to Azure Static Web Apps"
categories: azure
---

# Creating lightweight and globally available apps
This blog is built on Azure Static Web Apps by using a "flat file CMS" called Jekyll.
The advantage of "flat file CMS" is the fact that no database is required for serving the content
which on a blog like this is usually posts about topics that interest the author.

Azure Static Web Apps can be ran free for hobby / personal projects and even in production the cost of running this would be very low.

The repository for this blog can be found here [l3moni-blog-jekyll](https://github.com/L3mondrop/l3moni-blog-jekyll){:target="_blank"}

# If you wish to learn all the basics of az static web apps, I highly recommend this training [Microsoft Learn](https://docs.microsoft.com/en-us/learn/paths/azure-static-web-apps/){:target="_blank"}

## TL;DR
#### Step 1: Create a repo (GitHub or Azure DevOps)

Commit your code to the "root" or depending on the front-end framework in use [configure front-end](https://docs.microsoft.com/en-us/azure/static-web-apps/front-end-frameworks){:target="_blank"}

#### Step 2: Create a Azure Static Web App & configure the right repo to by synced

Azure Portal -> Create -> Azure Static Web App -> Configure RG, location, name & plan -> Configure repo source

![instructions-screenshot](/assets/portal-az-static-webapp.png)

or 

```azurecli
az staticwebapp create -n MyStaticAppName -g MyExistingRg -s https://github.com/L3mondrop/l3moni-blog-jekyll -l westeurope -b master --login-with-github
```
More details on AZ CLI commands: [az staticwebapp](https://docs.microsoft.com/en-us/cli/azure/staticwebapp?view=azure-cli-latest#az_staticwebapp_create)


