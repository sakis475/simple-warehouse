# Skroutz Last Mile Technical Assignment

## Instructions - How To

1. Clone this repository and cd in it.
2. `docker-compose up -d //Needs docker for this installed and running`
3. `npm i`
4. `npm run test //Test the api`
5. `npm run start:prod`
6. Then open localhost:3013 in any browser

## API Endpoints

| Path            | Method/Query                                                         | Description                                 |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| /               | GET                                                                  | serves Angular                              |
| /home           | GET                                                                  | serves Angular                              |
| /register       | POST (body: {name: string, password: string})                        | Registers a user, returns a JWT             |
| /login          | POST (body: {name: string, password: string, registerToken: string}) | Signs In a user, returns a JWT              |
| /order          | GET (query: [driver: string, scanned: boolean])                      | Returns the status of the order             |
| /order          | POST (body: { voucher: string, postcode: string })                   | Adds a new order/package                    |
| /order          | PUT (body: { voucher: string, postcode: string, scanned: boolean })  | Edit package info                           |
| /order          | DELETE (query: [voucher: string])                                    | Deletes an order                            |
| /scan           | PUT (body: {voucher: string})                                        | Updates the DB that this package is scanned |
| /drivers        | GET                                                                  | Returns drivers info                        |
| /drivers        | POST (body: { name: string, cluster: string })                       | Adds a new driver                           |
| /drivers        | PUT (body: { name: string, newName: string, cluster: string })       | Edit a driver info                          |
| /drivers        | DELETE (query: [name: string])                                       | Delete a driver                             |
| /clusters       | GET                                                                  | Returns clusters info                       |
| /clusters       | POST (body: { name: string, postcode: string })                      | Adds a new cluster                          |
| /clusters       | PUT (body: { name: string, newName: string, postcode: string })      | Edit a cluster info                         |
| /clusters       | DELETE (query: [name: string])                                       | Delete a cluster                            |
| /reset-database | GET                                                                  | Resets the database to initial state        |

# Exercise

## Objective:

**Implement a sorting system for scanning warehousepackages**

## Description:

Our warehouse has currently received the followingten packages and whose delivery postcode
is provide:

```
Voucher    Postcode
A1A         10041
B2B         11332
C3C         10042
D4D         11342
E5E         11444
F6F         16788
G7G         16788
H8H         10043
I9I         16800
J0J         16801
```

The packages will be allocated to a driver based on the cluster that each driver belongs to:

```
Driver    Cluster
Moe           A
Larry         B
Curly         C
```

Packages are organized in clusters based on their postcode:

```
Cluster    Postcodes
A          10XXX
B          11XXX
C          16XXX
```

## Assignment:

You are required to implement a system for the warehouse team that will inform them of the
packages that each driver needs to pick up. In addition,the system needs to track each item
that is picked up and scanned by the warehouse team,showing which drivers are ready and
which packages are missing from the rest.

You can assume that when a package is scanned, it’s barcode is typed in as an input and
submitted. (We can simulate this by typing vouchers in an input field and pressing enter).
Packages are scanned one at a time.

## Deliverable:

We expect you to build an API that will sort the packages accordingly and will handle requests
for scanned packages. For the frontend, you may usea simple html form or an SPA framework,
it’s up to you, all we need is a way to interact withthe API and to view the results.

The deliverable should be posted in a git repository, together with instructions for running and
testing.

\*It would be great if you can provide an endpoint for resetting the state of the system so we can
retest.
