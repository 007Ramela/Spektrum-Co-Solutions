document.getElementById('softwareForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;

    document.getElementById('userInput').style.display = 'none';
    document.getElementById('status').style.display = 'block';

    try {
        const response = await fetch('/api/generateSoftware', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName,
                projectDescription: projectDescription
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            document.getElementById('statusMessage').innerText = 'Your project is live!';
            document.getElementById('liveUrl').innerText = `Live URL: ${data.url}`;
            document.getElementById('result').style.display = 'block';
        } else {
            document.getElementById('statusMessage').innerText = 'There was an error generating your project.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'An error occurred while generating your project.';
    }
});
