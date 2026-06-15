resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_healthcare_workspace" "workspace" {
  name                = var.fhir_workspace_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
}

resource "azurerm_healthcare_fhir_service" "fhir" {
  name                = var.fhir_service_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  workspace_id        = azurerm_healthcare_workspace.workspace.id

  kind = "fhir-R4"

  authentication {
    authority           = "https://login.microsoftonline.com/653a0b51-7f7a-4c0f-a71c-8de203850cc2"
    audience            = "https://${var.fhir_workspace_name}-${var.fhir_service_name}.fhir.azurehealthcareapis.com"
    smart_proxy_enabled = false
  }
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = var.aks_dns_prefix

  kubernetes_version = "1.34.8"

  default_node_pool {
    name       = "agentpool"
    node_count = 2
    vm_size    = "Standard_D2ps_v6"

    temporary_name_for_rotation = "tmpnp"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin      = "azure"
    network_plugin_mode = "overlay"
    load_balancer_sku   = "standard"
    network_policy      = "none"
    outbound_type       = "loadBalancer"
  }

  oidc_issuer_enabled       = true
  workload_identity_enabled = true

  image_cleaner_enabled        = true
  image_cleaner_interval_hours = 168

  role_based_access_control_enabled = true

  local_account_disabled = false

  tags = {
    project     = "FHIR Patient Registration Portal"
    environment = "demo"
  }
}

resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}