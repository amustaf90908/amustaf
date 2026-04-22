// DNS Lookup Function
async function performDNSLookup() {
    const domain = document.getElementById('domainInput').value.trim();
    const resultDiv = document.getElementById('lookupResult');

    // Clear previous result
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('active', 'success', 'error');

    if (!domain) {
        resultDiv.innerHTML = '<p>Please enter a domain name.</p>';
        resultDiv.classList.add('active', 'error');
        return;
    }

    // Validate domain format
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
        resultDiv.innerHTML = '<p>Invalid domain format. Please enter a valid domain (e.g., example.com).</p>';
        resultDiv.classList.add('active', 'error');
        return;
    }

    resultDiv.innerHTML = '<p>Looking up DNS information...</p>';
    resultDiv.classList.add('active');

    try {
        // Using DNS lookup API (e.g., dns.google or similar)
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        
        if (!response.ok) {
            throw new Error('DNS lookup failed');
        }

        const data = await response.json();

        if (data.Answer) {
            let html = `<h4>DNS Results for: ${domain}</h4>`;
            html += '<ul style="text-align: left; margin: 1rem 0;">';

            // Display A records (IPv4 addresses)
            data.Answer.forEach(record => {
                if (record.type === 1) { // A record
                    html += `<li><strong>IPv4 Address:</strong> ${record.data}</li>`;
                }
            });

            html += '</ul>';
            resultDiv.innerHTML = html;
            resultDiv.classList.add('success');
            resultDiv.classList.remove('error');
        } else {
            resultDiv.innerHTML = `<p>No DNS A records found for ${domain}. This could mean the domain doesn't exist or uses only IPv6.</p>`;
            resultDiv.classList.add('error');
            resultDiv.classList.remove('success');
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Unable to look up DNS information for ${domain}. This could be due to network issues or the domain not existing.</p><p><small>Error: ${error.message}</small></p>`;
        resultDiv.classList.add('error');
        resultDiv.classList.remove('success');
    }
}

// Allow Enter key to trigger lookup
document.addEventListener('DOMContentLoaded', function() {
    const domainInput = document.getElementById('domainInput');
    domainInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performDNSLookup();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Used to grade the quiz. Utilizes a simple scoring system and provides feedback based on the user's answers. The quiz covers various DNS concepts, including record types, protocols, and port numbers.
//  The grading function checks each answer against the correct ones and calculates the total score, providing detailed feedback for each question and an overall assessment at the end.

function gradeQuiz() {
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('active', 'success', 'error');

    // Correct answers
    const answers = {
        q1: "a",
        q2: "udp",
        q3: "53",
        q4: "mx",
        q5: ["a", "aaaa", "cname"]
    };
    
    // Initialize score and total questions

    let score = 0;
    let total = 5;
    let output = "<h3>Quiz Results</h3>";

    /* Q1 */    
    // Retrieve the user's answer for Q1, trim whitespace, and convert it to lowercase for comparison. 
    // The user's answer is then compared to the correct answer defined in the answers object. If the user's answer matches the correct answer, the score is incremented.
    //  Feedback for Q1 is generated based on whether the user's answer is correct or incorrect, and it includes the correct answer for reference.
    const q1 = document.getElementById('q1').value.trim().toLowerCase();
    if (q1 === answers.q1) score++;
    output += `<p><strong>Q1:</strong> ${q1 === answers.q1 ? "Correct" : "Incorrect"} — Answer: A</p>`;

    /* Q2 */
    // Select the checked radio button for Q2 and compare its value to the correct answer defined in the answers object. 
    // If the selected value matches the correct answer, increment the score.
    //  The feedback for Q2 is then generated based on whether the user's answer is correct or incorrect, and it includes the correct answer for reference.
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q2val = q2 ? q2.value : "";
    if (q2val === answers.q2) score++;
    output += `<p><strong>Q2:</strong> ${q2val === answers.q2 ? "Correct" : "Incorrect"} — Answer: UDP</p>`;

    /* Q3 */
    // Select the checked radio button for Q3 and compare its value to the correct answer defined in the answers object. 
    // If the selected value matches the correct answer, increment the score.
    //  The feedback for Q3 is then generated based on whether the user's answer is correct or incorrect, and it includes the correct answer for reference.

    const q3 = document.querySelector('input[name="q3"]:checked');
    const q3val = q3 ? q3.value : "";
    if (q3val === answers.q3) score++;
    output += `<p><strong>Q3:</strong> ${q3val === answers.q3 ? "Correct" : "Incorrect"} — Answer: 53</p>`;

    /* Q4 */
    // Select the checked radio button for Q4 and compare its value to the correct answer defined in the answers object. 
    // If the selected value matches the correct answer, increment the score.
    //  The feedback for Q4 is then generated based on whether the user's answer is correct or incorrect, and it includes the correct answer for reference.
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q4val = q4 ? q4.value : "";
    if (q4val === answers.q4) score++;
    output += `<p><strong>Q4:</strong> ${q4val === answers.q4 ? "Correct" : "Incorrect"} — Answer: MX</p>`;

    /* Q5 Multi‑Select */
    // Select multiple checkboxes for Q5 and compare with the correct set of answers that is predefined in the answers object.
    //  The user's selected answers are collected into an array, sorted, and then compared to the sorted correct answers to determine if the user's selection is correct.
    const q5 = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(x => x.value);
    const correctSet = JSON.stringify(answers.q5.sort());
    const userSet = JSON.stringify(q5.sort());

    if (correctSet === userSet) score++;
    output += `<p><strong>Q5:</strong> ${correctSet === userSet ? "Correct" : "Incorrect"} — Answers: A, AAAA, CNAME</p>`;

    /* Final Score */
    output += `<h3>Total Score: ${score}/${total}</h3>`;
    output += `<h3>${score >= 3 ? "Congratulations! You have a good understanding of DNS concepts." : "You can try again. You'll get it next time!"}</h3>`;

    resultDiv.innerHTML = output;
    resultDiv.classList.add('active');
    resultDiv.classList.add(score >= 3 ? 'success' : 'error');
}

// Resets the quiz form and results //
// Resets by using the form's reset method to clear all user inputs and selections, and also clears the result display area by removing any existing content and styling classes. 
// This allows the user to start fresh with a new attempt at the quiz without any previous answers or feedback being visible.
function resetQuiz() {
    document.getElementById('dnsQuiz').reset();
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('active', 'success', 'error');
}