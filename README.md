![Java](https://img.shields.io/badge/Java-FEB95F?style=for-the-badge&logo=java&logoColor=white)
![Spring-Boot](https://img.shields.io/badge/Spring-81FF5E?style=for-the-badge&logo=spring&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-1E7AB8?style=for-the-badge&logo=mysql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-84E713?style=for-the-badge&logoswagger&logoColor=white)

# A rental-unit management Api made in Springboot.
Rental-Units-Management-System is a rest-api that can serve a client that provides user interface in managing rental uits.
It is made using java spring boot Framework and swagger ui is used for documentation.

 
# Overview

This Api provides necessary endpoints that a client needs to manage rental units, tenants and utilities and their payments.

# Requirements

- Java 17 or later
- MySql server running on port 3306

# Set-up

- Clone the repository:
 
         

            git clone https://github.com/yourusername/Rental-Units-Management-System.git

            
- create database db_rentals
- **NB** make sure no application is running on port 8080 otherwise change port before running the application
-  Inside the target folder :
            

            java -jar Rental-Units-Management-0.0.1-SNAPSHOT.jar

            
- The application will start at http://localhost:8080
# Swagger Api documentation 
- For detailed documentation on endpoints and payloads visit "http://localhost:8080/swagger-ui.html" after your app starts.


# Main Endpoints (the rest are indicated on the main documentation)
```sql
/v1/units/
/v1/tenants/
/v1/utilities/
 ```
# Features
Rental-Units-Management-System provides the following features:

* download pdfs for  tenantslist, tenants-with-arrears-list, utilspayments-list and all-units.
* Create, edit and delete units, tenants and utilities.
* Check available units
* update unit availability
* update tenant payment status


# Usage
Once the server is running, you can access the API at `http://localhost:8080/`. You can use any HTTP client to interact with the API, such as curl . Alternatively, you can use swagger-ui to explore the endpoints.

# License
 Licensed under the MIT License.
