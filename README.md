# Search-app-by-custom-attributes
https://community.apigee.com/articles/11974/search-apps-using-custom-attributes.html


The following is a POC and is no way near production ready.

Problem statement:
If you have hundreds of apps and one of the key attributes for the app is a custom attribute . Today there is no way to search the app by a custom attribute. 

Why is this important:
When a developer or app is created in Apigee EDGE by default Apigee creates it’s own developer/app ID.
          App,App family,Company,Key,Consumer Key,Consumer Secret,Registered are the supported attributes for searching among apps. There is no way to search with a custom attribute. 
         Lots of companies store an internal ID (might be a salesforce identifier of the developer or the app or any other internal identifier of that particular entity) against the Apigee entity. And it might be easier to search using that internal ID. 


We are taking the app object from Edge and then storing that in BaaS. We are then using BaaS’s built in Search capabilities to search for the app using custom attributes.

Following are the steps to get it done:

Deploy the app :
http://<base_url>/migrate-edge-app?appId=f324b870-b7db-4600-80f7-49edaec1a47e
Where the appId can be retrieved from 

https://api.enterprise.apigee.com/v1/o/pixvy/apps or 

or from a number of other APIs. Details of different APIs to retrieve the ID can be found here and here.

Call this URL at app creation from dev portal (or the invocation point can be anything).

Once the apps are stored in BaaS one can make the following call to search for a particular app :

ql=select * where attributes.value contains ‘<custom_attribute_value>'


Challenges with the approach:
We have a data duplication now. So  for solving a problem we might have created a bigger challenge.
App’s can be updated from the following interfaces:
From the management UI
From the Developer portal
From management API
And with the solution built so far it won’t automatically sync the data across the two sources.

Possible workarounds:
Instead of (Or along with) running this script for per app creation run this as a scheduled job which when run will update all the  previously stored app data.
