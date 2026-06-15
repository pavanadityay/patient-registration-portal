variable "location" {
  default = "canadacentral"
}

variable "resource_group_name" {
  default = "rg-patient-registration-demo"
}

variable "acr_name" {
  default = "patientdemoacr"
}

variable "aks_name" {
  default = "patient-demo-aks"
}

variable "aks_dns_prefix" {
  default = "patient-demo-aks-dns"
}

variable "fhir_workspace_name" {
  default = "patientdemoworkspace"
}

variable "fhir_service_name" {
  default = "patientfhirservice"
}

variable "backend_image" {
  default = "backend:v2"
}

variable "frontend_image" {
  default = "frontend:v5"
}