# Tableau PowerPoint Add-In

This add in gives the ability to embed a Tableau Viz inside of a PowerPoint document. Currently, the add-in is not published to the Office Store, but you can still try it out locally. If you are a SharePoint Administrator, you can add the add-in to your organization's list of add-ins (See [here](https://dev.office.com/docs/add-ins/publish/publish-task-pane-and-content-add-ins-to-an-add-in-catalog)).

### The manifest XML
The add-in is defined by its manifest XML. This is located in the project at [./dist/office/tableau-manifest.xml](https://github.com/sdesmond46/tableau-ppt/blob/master/dist/office/tableau-manifest.xml). This is the manifest you'll need to use this add-in

### Windows Desktop Configuration
To set up the add-in in Windows, you'll need to configure a shared folder which contains the manifest XML. You'll then need to edit some settings in PowerPoint to make this folder as trusted add-in catalog. For simplicity, you can use the shared folder `\\tsi.lan\files\Home\AMER\sdesmond\Shared\tableau-ppt`. See the full instructions [here](https://dev.office.com/docs/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins).

### Mac Desktop Configuration
On Mac, you simply need to place the manifest XML in a particular location. See full instructions [here] (https://dev.office.com/docs/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac).

### Office Online Configuration
For Office Online, you need to upload the manifest XML. See full instructions [here](https://dev.office.com/docs/add-ins/testing/sideload-office-add-ins-for-testing).


*Please Note: The only way for the seamless use of an add-in between Windows, Mac, and Online is if the add-in is published to a SharePoint catalog or in the Office Store.*

# Development Info
It's written in react. Try the usual `npm install` and `npm start`. More details to come soon...
