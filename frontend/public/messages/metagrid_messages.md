# Welcome to the Metagrid Beta test v1.0.10

Use the Help link to find information on how to contact support or report any issues you find.

## Globus Auth

We now support logins via Globus Auth at LLNL.

## Globus Transfers enabled

This version of Metagrid supports the user of Globus to transfer ESGF datasets to your institutional or personal endpoint. The feature can be accessed at the bottom of the Data Cart page. At present only data published at LLNL is available for Globus Transfer via Metagrid. Other sites may continue to have data transferrable using the *legacy* CoG interface.
Note: for the time being, Institutional *Managed* endpoints aren't supported, but support for those is forthcoming.
For more information about Globus Transfers please see:  https://app.globus.org/help


## CORDEX data _not_ supported

Metagrid uses an updated user accounts system. Unfortunately for anyone looking for CORDEX data, these new accounts cannot be used to authenticate when running a CORDEX Wget script. Please use an ESGF _legacy_ OpenID obtained at any of the ESGF CoG instances listed here: https://esgf.github.io/nodes.html

## Upcoming changes to ESGF @LLNL

We are excited to be planning to have an "official" release of the Metagrid platform onto scalable infrastructure. In the meantime we will be testing new features.

- More feature updates and stability improvements planned to be released in v1.1.1.
- Improved redundancy and backend deployment enhancements utilizing our Kubernetes cluster.
