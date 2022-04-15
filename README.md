## Scenario
We want to simulate a hardware device that sends telemetry data to an IoT platform, [Thingsboard](https://github.com/thingsboard/thingsboard) in our case. All interactions with this platform should be done via the provided API that comes in two flavors: HTTPS and MQTTS.

Before proceeding with the simulating of the hardware device, a provision process should take place, meaning that a Thingsboard device should be created using the appropriate HTTP API call. Next step is uploading data to the Thingsboard server as device telemetry, using the MQTT API variant this time. Finally, we should be able to validate the results of previous steps by requesting telemetry data via the HTTP API.

All communication should be secure and the orchestration of these two applications should be done using docker-compose.



### You are provided with:
- Empty repository with readme, with detailed explanation of the test
- Thingsboard server url
- Tenant admin credentials

### You need to deliver:
1. Backend App

A node express app with two REST endpoints that will interact with a Thinsgboard server:
  - Endpoint for device creation: response should contain both device info and device access token
  - Endpoint for fetching telemetry: returns the aggregated (SUM per hour) telemetry data from a specific device

2. Client App

A python script that imports data from a CSV file (data.csv) and submits telemetry to a registered device on Thingsboard using MQTTS telemetry API

3. Dockerize everything

Both apps should be containerized and wrapped in docker-container script for easy deployment

4. Code

All code used should be available in this repository
