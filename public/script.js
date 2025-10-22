function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Incense lighting effect
function animateIncense() {
    const mainImage = document.getElementById('mainImage');
    
    // Add gentle shake effect
    mainImage.style.animation = 'imageFloat 0.5s ease-in-out infinite alternate';
    
    // Create floating particles when lighting incense
    createPrayerParticles();
}

function createPrayerParticles() {
    const prayArea = document.querySelector('.pray-area');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'radial-gradient(circle, #F2CD88, #F2CAA7)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animation = `prayerFloat ${Math.random() * 2 + 2}s ease-out forwards`;
        
        prayArea.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes prayerFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -100px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -200px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

document.getElementById('prayForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const prayButton = document.getElementById('prayButton');
    const originalText = prayButton.innerHTML;
    
    prayButton.disabled = true;
    prayButton.innerHTML = '<span class="button-text">Lighting incense...</span><div class="button-icon">⏳</div>';
    
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value || '', // Allow empty email
            prayer: document.getElementById('prayer').value,
            timestamp: new Date().toISOString()
        };
    
    try {
        animateIncense();
        
        const response = await fetch('/api/pray', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showSuccessMessage();
            
            document.getElementById('prayForm').reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error sending data');
        }
    } catch (error) {
        showErrorMessage(error.message || 'An error occurred. Please try again later.');
    } finally {
        prayButton.disabled = false;
        prayButton.innerHTML = originalText;
    }
});

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    createPrayerParticles();
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function showErrorMessage(message) {
    // Create error popup
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h3>Sorry!</h3>
            <p>${message}</p>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    
    // Add styles
    errorPopup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .error-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
            animation: slideIn 0.3s ease-out;
        }
        .error-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        .error-content h3 {
            color: #e74c3c;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        .error-content p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .error-close {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s ease;
        }
        .error-close:hover {
            background: #c0392b;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(errorPopup);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorPopup.parentNode) {
            errorPopup.remove();
        }
    }, 5000);
}

document.getElementById('prayButton').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
});

document.getElementById('prayButton').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
    
    // Add flickering effect for main image
    const mainImage = document.getElementById('mainImage');
    setInterval(() => {
        mainImage.style.filter = `brightness(${0.9 + Math.random() * 0.2}) saturate(${1 + Math.random() * 0.3})`;
    }, 200);
    
    // Add focus effects for form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
    });
});

// Add parallax effect for floating particles
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for title
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    typeWriter(title, originalText, 150);
});
