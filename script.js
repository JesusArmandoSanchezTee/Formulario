document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const form = document.getElementById('leadForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const userEmail = document.getElementById('userEmail');
    const backButton = document.getElementById('backButton');
    const confettiCanvas = document.getElementById('confettiCanvas');

    // Validación de formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar campos
        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (isNameValid && isEmailValid) {
            // Mostrar estado de carga
            submitBtn.classList.add('loading');

            // Simular envío (reemplazar con tu lógica de envío real)
            setTimeout(function() {
                submitBtn.classList.remove('loading');
                showSuccessMessage();
            }, 1500);
        }
    });

    // Validación en tiempo real
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);

    // Botón para volver al formulario
    backButton.addEventListener('click', function() {
        successMessage.classList.remove('show');
        form.reset();
        nameInput.classList.remove('valid', 'invalid');
        emailInput.classList.remove('valid', 'invalid');
    });

    // Funciones de validación
    function validateName() {
        const name = nameInput.value.trim();

        if (name === '') {
            setError(nameInput, nameError, 'El nombre es obligatorio');
            return false;
        } else if (name.length < 3) {
            setError(nameInput, nameError, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            setSuccess(nameInput);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            setError(emailInput, emailError, 'El correo es obligatorio');
            return false;
        } else if (!emailRegex.test(email)) {
            setError(emailInput, emailError, 'Ingresa un correo electrónico válido');
            return false;
        } else {
            setSuccess(emailInput);
            return true;
        }
    }

    function setError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }

    function setSuccess(input) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    }

    // Mostrar mensaje de éxito
    function showSuccessMessage() {
        userEmail.textContent = emailInput.value;
        successMessage.classList.add('show');
        createConfetti();
    }

    // Animación de confeti
    function createConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 150;
        const colors = ['#FF69B4', '#7B68EE', '#3CB371', '#FFD700', '#FF6347'];

        // Crear partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 2,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 + 1
            });
        }

        // Animar confeti
        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.y > confettiCanvas.height) {
                    p.y = -10;
                    p.x = Math.random() * confettiCanvas.width;
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Ajustar tamaño del canvas al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    });
});