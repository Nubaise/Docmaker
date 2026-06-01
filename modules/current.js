module.exports = (blocks, children) => {

    children.push(
        blocks.createModuleTitle(
            "Module 0",
            "Networking Fundamentals"
        )
    );

    blocks
        .createLearningObjectives([
            "What is a computer network?",
            "What is packet switching?",
            "What is the Internet?"
        ])
        .forEach(item => children.push(item));

    children.push(
        blocks.createPartHeading(
            "1. What is a Computer Network?"
        )
    );

    children.push(
        blocks.createBody(
            "A computer network is a collection of devices connected together so they can exchange data and share resources."
        )
    );

    children.push(
        blocks.createBullet("Computers")
    );

    children.push(
        blocks.createBullet("Phones")
    );

    children.push(
        blocks.createBullet("Servers")
    );

};