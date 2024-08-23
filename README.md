# This is Backend of InternTrack web app 

* App Description : This is a Intern mangement web app.
    
    Register/login by Interns
 
# Interns DsashBoard
    Features:
    * Update There Detais and Profile image.
    * Add there Learing In MyLearnigs Section.
    * Donload there internship certificate after internship complition.

# Admin DashBoard
    Features:
    * show conts of all the students , unverifed, verififed, uncertified, certified.
    * Check All the detais of the Interns.
    *Admin can veriy the unverifed student.
    *Generate cerficates for verified interns.
    * Check All the list of the Intersn unverifed, verififed, uncertified, certified.

# Tech Stack of The Backend
    Stack:
    *Node.js
    *Express.js
    *MongoDb
    *Mongoose
    

# APIs 
## Authentication API
### Register API
    API:Endpoint => "/auth/signUp",
    API:Method => POST
    send user Iputs in objec => basicInfo :{
        name:"",
        email:"",
        password:"",
    };

### Login API
    Endpoint => "/auth/login";
    Method => POST 
    send login unpts in object => {
            email:"",
            password:"",
    }

## User API
### Upload Profile Image API
    Endpoint => "/user/profile/:id"
    Method => POST
    Form shuld be include => Multipart/form-data

### Upload Learnigs in Mylearnigs section
    Endpoint => "/user/learning/:id"
    Method => POST
    In body send object => {
        title: '',
        description: '',
        image: "Image name";
    }

### Get user myLearning Data
    Endpoint => "/user//learning/:id"
    Method => GET

### Get user Detais Information
    Endpoint => "/user/edit/:id"
    Method => GET

### Save Edited Data
    Endpoint => "/user/details/:id"
    Method => POST

## Admin API

### Get all user Data
    Endpoint => "/admin/alluser"
    Method => GET

### Get all unverified 
    Endpoint => "/admin/Unverified"
    Method => GET

### Get all varified user
    Endpoint => "/admin/verified"
    Mehod => GET

### Get all uncertified user
    Endpoint => "/admin/unCertified"
    Method => GET

### GEt all Certified user
    Endpoint => "/admin/Certified"
    Method => GET

### Verify user 
    Endpoint => "/admin/verify/:id"
    Mehod => POST

### Verify multiple user in One click
    Endpoint => "/admin/verifyAll"
    Method => POST
    Send selected user ids in body in array => {
        [id1,id2, id3...]
    }

### Genrate Certificate API BY Admin 
    Endpoint => "/certificate/certificate"
    Method => POSt
    Send selected user ids in body in array => {
        [id1,id2, id3...]
    }

## Note: For admin Login
    use This eamil and password
    Email: prakash@95
    Password: Prakash@95

### Contributers 
    Mskan Gaur 
    Anurag Rathode
    Prakash Kumar









    











    