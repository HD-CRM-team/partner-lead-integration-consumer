# HD Partner Integration (Consummer)

This snippet allows HD Partners to receive leads using queues.
Disclamer: This code give the approach and can be use for test but is
**not production ready**.

# Installation

Prerequistes:
  - nodejs v.10

To start the application:
  1. Clone this repository.
  2. change directory: ```cd partner_lead_integration_consumer```
  3. Install dependencies: ```npm i```
  4. Set the following environment variables
      - CLOUDAMQP_URL: the url to HD rabbit mq given by the CRM team
      - PARTNER_TOPIC: the partner topic given by the CRM team
  5. npm start

**Important** queues are secure so that a partner can only listen to his queue.

