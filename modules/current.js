// modules/current.js
module.exports = (blocks, children) => {

    children.push(...blocks.createModuleTitle("Module 3", "Docker Volumes & Networking"));
    children.push(blocks.createSpacer());

    children.push(...blocks.createLearningObjectives([
        "Understand what Docker volumes are and why they matter",
        "Create and manage named and anonymous volumes",
        "Use bind mounts for development workflows",
        "Connect containers using Docker networks",
    ]));

    children.push(blocks.createSpacer());
    children.push(blocks.createPartHeading("Part 1: The Data Persistence Problem"));
    children.push(blocks.createBody(
        "By default, all data written inside a container is stored in the container's writable layer. When the container is deleted, that data is gone forever. This is a major problem for databases, user uploads, and application state."
    ));

    children.push(blocks.createSubHeading("Why Containers Lose Data"));
    children.push(blocks.createBullet("Container filesystem is ephemeral by design"));
    children.push(blocks.createBullet("Restarting a container keeps data; removing it does not"));
    children.push(blocks.createBullet("Image layers are read-only; writes go to a thin writable layer on top"));

    children.push(blocks.createMinorHeading("The Three Storage Options"));
    children.push(blocks.createTable(
        ["Type", "Managed By", "Use Case"],
        [
            ["Volumes", "Docker", "Databases, persistent app data"],
            ["Bind Mounts", "Host OS", "Development, live code reload"],
            ["tmpfs Mounts", "Memory", "Sensitive data, caching"],
        ]
    ));

    children.push(blocks.createSpacer());
    children.push(blocks.createPartHeading("Part 2: Docker Volumes"));
    children.push(blocks.createBody(
        "Docker volumes are the recommended mechanism for persisting data generated and used by Docker containers. They are completely managed by Docker."
    ));

    children.push(blocks.createSubHeading("Creating and Using Volumes"));
    children.push(blocks.createMinorHeading("Create a Named Volume"));
    children.push(...blocks.createCodeBlock(
`docker volume create my_data
docker volume ls
docker volume inspect my_data`
    ));

    children.push(blocks.createMinorHeading("Mount a Volume in a Container"));
    children.push(...blocks.createCodeBlock(
`docker run -d \\
  --name my_postgres \\
  -v my_data:/var/lib/postgresql/data \\
  postgres:15`
    ));

    children.push(...blocks.createInfoBox(
        "💡 Pro Tip",
        "Always use named volumes in production. Anonymous volumes (created automatically) are harder to manage and track."
    ));

    children.push(...blocks.createWarningBox(
        "⚠ Warning",
        "Never store sensitive data (passwords, tokens) in a Docker image layer. Use volumes or environment variables passed at runtime."
    ));

    children.push(blocks.createSpacer());
    children.push(blocks.createSubHeading("Module Summary Checklist"));
    children.push(blocks.createChecklistItem("I can create and inspect Docker volumes"));
    children.push(blocks.createChecklistItem("I understand the difference between volumes and bind mounts"));
    children.push(blocks.createChecklistItem("I can connect containers using Docker networks"));
    children.push(blocks.createChecklistItem("I know how to persist database data across container restarts"));

    children.push(blocks.createSpacer());
    children.push(blocks.createSubHeading("Step-by-Step: Set Up a Persistent Database"));
    children.push(blocks.createNumbered("Create a named volume for database storage"));
    children.push(blocks.createNumbered("Run the database container with the volume mounted"));
    children.push(blocks.createNumbered("Verify the volume is attached with docker inspect"));
    children.push(blocks.createNumbered("Stop and remove the container"));
    children.push(blocks.createNumbered("Start a new container using the same volume — data persists"));
};
