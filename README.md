\# CloudShip — CI/CD Automation \& Container Security



CloudShip is a DevOps automation project that demonstrates how to test, containerize, scan, and publish a Node.js application using modern CI/CD tools.



The project integrates GitHub Actions, Jenkins, Docker, GitHub Container Registry (GHCR), and Trivy to build a repeatable application delivery workflow.



\## Project Overview



CloudShip demonstrates the core stages of a DevOps pipeline:



\- \*\*Continuous Integration:\*\* Install dependencies and run automated tests.

\- \*\*Containerization:\*\* Package the application into a Docker image.

\- \*\*Container Security:\*\* Scan the Docker image for HIGH and CRITICAL vulnerabilities using Trivy.

\- \*\*Dependency Security:\*\* Audit npm dependencies and review dependency changes in pull requests.

\- \*\*Continuous Delivery:\*\* Publish Docker images to GitHub Container Registry.

\- \*\*Health Verification:\*\* Run the container and verify its health endpoint.



\## Architecture



```mermaid

flowchart TD

&#x20;   A\[Developer] --> B\[GitHub Repository]

&#x20;   B --> C\[GitHub Actions]

&#x20;   B --> D\[Jenkins CI]

&#x20;   C --> E\[Install Dependencies]

&#x20;   E --> F\[Run Tests]

&#x20;   F --> G\[Build Docker Image]

&#x20;   G --> H\[Trivy Security Scan]

&#x20;   H --> I\[Run Container]

&#x20;   I --> J\[Health Check]

&#x20;   J --> K\[Publish Image to GHCR]

```



\## Technology Stack



| Technology | Purpose |

|---|---|

| Node.js | Application runtime |

| JavaScript | Application and test code |

| Git and GitHub | Source control and collaboration |

| GitHub Actions | Automated CI/CD workflow |

| Jenkins | Pipeline automation |

| Docker | Application containerization |

| GitHub Container Registry | Container image storage |

| Trivy | Container vulnerability scanning |

| npm audit | Dependency vulnerability auditing |

| Node.js Test Runner | Automated application tests |



\## Application Endpoints



| Endpoint | Description |

|---|---|

| `/` | Returns the CloudShip service response |

| `/health` | Returns the application's health status |

| Other routes | Return HTTP 404 |



The health endpoint returns JSON indicating that the service is running.



\## Continuous Integration and Delivery



The GitHub Actions workflow performs the following steps:



1\. Checks out the repository.

2\. Sets up Node.js 22.

3\. Installs dependencies using `npm ci`.

4\. Audits dependencies using `npm audit`.

5\. Builds the Docker image.

6\. Scans the image using Trivy.

7\. Starts the container and checks the health endpoint.

8\. Publishes the image to GHCR on pushes to the `main` branch when the preceding checks pass.



The Jenkins pipeline independently checks out the source code, verifies the Node.js and npm versions, installs dependencies, and runs the application tests.



\## Container Image



The published container image is available at:



\*\*GHCR image:\*\* `ghcr.io/jayasri-1805/cloudship`



Pull the image on a machine with Docker installed:



```bash

docker pull ghcr.io/jayasri-1805/cloudship:latest

```



Run the container:



```bash

docker run --rm -p 3000:3000 ghcr.io/jayasri-1805/cloudship:latest

```



Test the health endpoint:



```bash

curl http://localhost:3000/health

```



Expected response:



```json

{

&#x20; "status": "ok",

&#x20; "service": "CloudShip"

}

```



\## Run Locally



Requirements: Node.js 22 or later and npm.



Clone the repository:



```bash

git clone https://github.com/jayasri-1805/CloudShip.git

cd CloudShip

```



Install dependencies:



```bash

npm ci

```



Run tests:



```bash

npm test

```



Start the application:



```bash

npm start

```



Open `http://localhost:3000/health` in your browser.



\## Security Practices



\- npm dependency auditing.

\- Trivy image scanning with a HIGH and CRITICAL severity gate.

\- `.gitignore` rules to help prevent committing environment files and dependencies.

\- `.dockerignore` rules to reduce unnecessary Docker build context.

\- A non-root user for the application container.

\- Pull-request dependency review.



Security scans help identify known vulnerabilities but do not guarantee that the application is completely secure.



\## Repository Structure



```text

CloudShip/

├── .github/

│   └── workflows/

│       ├── docker-build.yml

│       └── dependency-review.yml

├── src/

│   └── server.js

├── test/

│   └── server.test.js

├── .dockerignore

├── .gitignore

├── Dockerfile

├── Jenkinsfile

├── package.json

├── package-lock.json

├── README.md

└── architecture.mmd

```



\## Project Goals



CloudShip is designed to demonstrate practical knowledge of CI/CD, automated testing, containerization, vulnerability scanning, and container registry publishing.



\## Future Enhancements



\- Deploy the container to a cloud platform with a verified free-tier option.

\- Add deployment verification and rollback strategies.

\- Add observability through structured logging and metrics.

\- Improve release versioning and image provenance.



\*\*Cost note:\*\* Cloud deployment is optional. Verify current pricing and resource limits before provisioning any cloud services.



\---



\*\*Repository:\*\* https://github.com/jayasri-1805/CloudShip  

\*\*Container Registry:\*\* https://github.com/jayasri-1805/CloudShip/pkgs/container/cloudship

