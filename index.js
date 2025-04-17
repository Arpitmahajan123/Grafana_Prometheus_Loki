// const express = require("express"); 
// const { register } = require("module");
// const client = require('prom-client'); //For Metric Collection

// const app = express();
// const PORT = process.env.PORT || 8000;

// // For Mointoring :
// const collectDefaultMetrics = client.collectDefaultMetrics();
// client.collectDefaultMetrics({ register: client.register });



// app.get("/", (req,res) => {
//     return res.json({ message : "Hello From Server"});
// });


// // For Seening The Mointoring As A Response. 
// app.get("/metrics", async (req,res) => {
//     res.setHeader("Content-Type", client.register.contentType);
//     const metrics = await client.register.metrics();
//     res.send(metrics);
// });


// app.get("/slow", async (req, res) => { 
//     try { 
//         const timeTaken = await doSomeHeavyTask(); 
//         return res.json({
//             status: "Success", 
//             message: 'Heavy task completed in ${timeTaken}ms', 
//         })
//     }
    
//     catch (error) { 
//         return res 
//             .status(500) 
//             .json({ status: "Error", error: "Internal Server Error"});
//         } 
// });

// app.listen(PORT, () =>
//     console.log(`Express Server Strated at ${PORT}`)
// );

const express = require("express");
const client = require('prom-client'); // For Metric Collection

const app = express();
const PORT = process.env.PORT || 8000;

// For Monitoring:
client.collectDefaultMetrics({ register: client.register });

app.get("/", (req, res) => {
    return res.json({ message: "Hello From Server" });
});

// For Seeing The Monitoring As A Response.
app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

const doSomeHeavyTask = async () => {
    // Simulate a heavy task
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(200); // Simulate time taken in milliseconds
        }, 200);
    });
};

app.get("/slow", async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy task completed in ${timeTaken}ms`, // Use backticks for template literals
        });
    } catch (error) {
        return res
            .status(500)
            .json({ status: "Error", error: "Internal Server Error" });
    }
});

app.listen(PORT, () =>
    console.log(`Express Server Started at ${PORT}`)
);



