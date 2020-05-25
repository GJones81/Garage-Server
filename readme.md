# Garage Server-side

This is the server side of the Garage application. The app allows the user to do multiple things to help facilitate a garage sale or yard sale. The app can create and manage an empty list, add items to that list and manage those items, as well as create a sale event that has a date, address location, and an attached list of items for sale. The afore mentioned functionality is only accessible to the individual user who is logged in and owns those datasets. A logged in user can also see a list of all sales which have been created and a list of the items available at each sale. When the list is first created it only has a title and an Id number, and the title of the list can be edited. Note When the list is deleted, all items on that list are deleted as well. Items are added to the list as subdocuments. Items on the list can be edited and deleted as needed. When the sale document is created it references a list. The sale document itself can be edited and deleted. The server-side uses Express.js, MongoDB, and Mongoose to store the data. The application client-side uses the React.js. 

The initial plan for this application included the integration of the Mapbox API to display the location of each sale event on a map display. Additionally, a calendar API to help the user schedule, and manage their sale events. A minor improvement to the app which we didn't have time to implement was hiding the list of items for each sale on the Discovery page. The user would have been given a button to click on in order to see the items at the sale the in which they are interested. Additionally the sales aren't presented in order based on date. This would be a worthwhile addition for a better user experience.

## What it includes

* Local Auth (email and password)
* Hashed passwords
* JWT Tokens and CORS for limiting routes to authorized users
* Settings for MongoDB and Mongoose
* Reactstrap for styling

## Routes

### Auth
|Method|Path|Purpose|
|----------|----------|--------------------|
|POST|/auth/login|Login|
|POST|/auth/signup|Signup|

### Profile
|Method|Path|Purpose|
|----------|----------|--------------------|
|GET|/profile|User profile|

### List / Item
|Method|Path|Purpose|
|----------|----------|--------------------|
|GET|/list|Retrieve the current lists|
|POST|/list|Create a new, empty list|
|PUT|/list/:id|Edit the list title|
|DELETE|/list/:id|Delete the list document|
|POST|/list/item|Create a new item subdocument|
|PUT|/list/item/:id|Edit the item|
|DELETE|/list/item/:id|Delete the item|

### Sale
|Method|Path|Purpose|
|----------|----------|--------------------|
|GET|/sale|Retrieve the current sale events|
|POST|/sale|Create a new sale|
|PUT|/sale/:id|Edit the sale|
|DELETE|/sale/:id|Delete the sale|

### Discovery
|Method|Path|Purpose|
|----------|----------|--------------------|
|GET|/discovery|Retrieves all the sales in the database|

## Schemas
### User
|Column|Type|Required|Notes|
|----------|----------|----------|---------------|
|firstname|String|true|N/A|
|lastname|String|true|N/A|
|email|String|true|unique: true, minlength: 5|
|password|String|true|minlength: 8, maxlength: 20|
|phone|String|false|N/A|
|pic|String|false|N/A|
|admin|Boolean|true|default: false|

### List
|Column|Type|Required|Notes|
|----------|----------|----------|---------------|
|user|mongooseSchema|true|ref: "User"|
|listTitle|String|true|N/A|
item|[itemSchema]|false|embedded schema|

### Item
|Column|Type|Notes|
|----------|----------|---------------|
|name|String|name of the item|
|price|Number|price of the item|
|image|String|url to cloudinary|
|condition|Number|1-10 rating of item condition|


### Local Development

1. Fork and clone
2. Run nodemon
3. Create a `.env.local` file at the top level 
4. Create an environment variable called JWT_SECRET and set it equal to a string
