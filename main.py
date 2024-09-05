from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

saved_papers = []

dummy_papers = [
    {"title": "Deep Learning for Engineers", "authors": "John Doe, Jane Smith", "year": 2018, "citations": 500},
    {"title": "A Survey on Neural Networks in deep", "authors": "Alice Brown, Bob White", "year": 2020, "citations": 300},
    {"title": "Quantum Computing Basics", "authors": "Chris Blue, David Green", "year": 2021, "citations": 100},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search_papers():
   
    query = request.args.get('q', '')
    results = [paper for paper in dummy_papers if query.lower() in paper['title'].lower()]
    return jsonify(results)

@app.route('/save', methods=['POST'])
def save_paper():
    paper = request.json
    if paper not in saved_papers:
        saved_papers.append(paper)
    return jsonify({"message": "Paper saved!"}), 201

@app.route('/saved', methods=['GET'])
def saved_papers_page():
    return render_template('saved.html')

@app.route('/get_saved_papers', methods=['GET'])
def get_saved_papers():
    return jsonify(saved_papers)

@app.route('/remove', methods=['POST'])
def remove_paper():
    paper = request.json
    if paper in saved_papers:
        saved_papers.remove(paper)
    return jsonify({"message": "Paper removed!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
