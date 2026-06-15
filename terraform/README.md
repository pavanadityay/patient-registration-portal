# Terraform Infrastructure Template

This folder contains a Terraform template for the FHIR Patient Registration Portal infrastructure.

## Resources Included

- Azure Resource Group
- Azure Container Registry
- Azure Health Data Services Workspace
- Azure FHIR R4 Service
- Azure Kubernetes Service
- AKS Managed Identity
- AKS to ACR AcrPull role assignment

## Azure Services

- AKS: `patient-demo-aks`
- ACR: `patientdemoacr`
- Resource Group: `rg-patient-registration-demo`
- FHIR Workspace: `patientdemoworkspace`
- FHIR Service: `patientfhirservice`
- Region: Canada Central

## Commands

```bash
terraform init
terraform plan
terraform apply