# RoomsManagement

Proof-Of-Concept of a Web application managing the rooms of our department in INSA campus.

## Setting up the system
First, let's have a look at the architecture depicted below:
![service oriented architecture](/)
A service oriented architecture

### OM2M

To deploy such an project, first, the OM2M environment has to be set up. One **Infrastructre Node** (IN, for the whole INSA) and **three Middle Nodes** (MN: a gateway for each floor of the *GEI*'s building), are here considered. They can be lunch as local servers from the folder OM2M of this project: the IN first, then the MN, by running either the start.bat or start.sh of their respective folders, depending on your machine (Windows or Linux). They will use ports `http://localhost:8081` (in_INSA),  `http://localhost:8181` (mn_GEI_rdc; rdc standing for groundfloor),  `http://localhost:8182` (mn_GEI_1st),  `http://localhost:8182` (mn_GEI_2nd).

Then, **Application Entities** (AE) have to be created, one for each of the room that the system will manage. OM2M allow us to control and store the state of actuators and sensors in containers (CNT), and the successive values of each instance of them are stored as containers' instances (CIN): we will consider four actuators, definied based on some realistic and usefull considerations: **light** (managing smartly the lights of the building will allow to prevent manual switching off at night), **computer** (switching off all computers at night, switching them on before the begining of practical works...), **heaters** (because students and teachers like to work in warm comfortable environments), and **window**, a container for an actuator that do not close and open windows (complicate to put in practice, and not that usefull), but the shutters of the windows, since electrical shutters do exist and would be able to replace fastidius opening and closing of hundreds of them each day over all the campus. Plus, a sensor (thermometer) for each room is also planed in our project. Those AE will be generated for now using Node-RED and an application soon pushed in this project.

### Microservices

Once that done, microservices can be launched: each has to be imported as a **dontremember** project in Eclipse (we developers are using Eclipse EE, Neon.3), and for each, the <devices>MS/src/main/java/fr/insa/<devices>MS/<Devices>MsApplication.java has to be **Run As > Java Application**. The first one to be lunched should be the RoomsMS, since other use its services for the User Interface. They will use ports `http://localhost:9081` (RoomsMS), `http://localhost:8082` (lightsMS), `http://localhost:8083` (computersMS), `http://localhost:8084` (heatersMS), `http://localhost:8085` (windowsMS), and `http://localhost:8086` (temperatureMS).

### User Interface

Finally, the User Interface (UI) can be deployed. It is developped using the framework angular. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).