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
