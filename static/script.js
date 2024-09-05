function searchPapers() {
    const query = document.getElementById('search-input').value;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;

    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(papers => {
            resultsDiv.innerHTML = '';
            papers.forEach(paper => {
                const paperDiv = document.createElement('div');
                paperDiv.className = 'paper col-md-4';  // Bootstrap columns for better layout
                paperDiv.innerHTML = `
                    <h3>${paper.title}</h3>
                    <p><strong>Authors:</strong> ${paper.authors}</p>
                    <p><strong>Year:</strong> ${paper.year}</p>
                    <p><strong>Citations:</strong> ${paper.citations}</p>
                    <button class="btn btn-success" onclick='savePaper(${JSON.stringify(paper)})'>Save</button>
                `;
                resultsDiv.appendChild(paperDiv);
            });
        });
}
function savePaper(paper) {
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paper)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
    });
}


function loadSavedPapers() {
    fetch('/get_saved_papers')
        .then(response => response.json())
        .then(papers => {
            const savedPapersDiv = document.getElementById('saved-papers');
            savedPapersDiv.innerHTML = '';
            papers.forEach(paper => {
                const paperDiv = document.createElement('div');
                paperDiv.className = 'paper col-md-4';  
                paperDiv.innerHTML = `
                    <h3>${paper.title}</h3>
                    <p><strong>Authors:</strong> ${paper.authors}</p>
                    <p><strong>Year:</strong> ${paper.year}</p>
                    <p><strong>Citations:</strong> ${paper.citations}</p>
                    <button class="btn btn-danger" onclick='removePaper(${JSON.stringify(paper)})'>Remove</button>
                `;
                savedPapersDiv.appendChild(paperDiv);
            });
        });
}

function removePaper(paper) {
    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paper)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  
        loadSavedPapers();
    });
}


if (window.location.pathname === '/saved') {
    loadSavedPapers();
}
