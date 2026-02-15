// Profe cambie el formta de txt a js, se lo mandte como txt porque el teams dice que es inseguro enviar .js, pero es un archivo js normal
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  const showError = (input, message) => {
    const container = input.closest('.salto');
    
    let errorMsg = container.querySelector('.error-message');
    
    if (!errorMsg) {
      errorMsg = document.createElement('small');
      errorMsg.classList.add('error-message');
      container.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  };

  const clearError = (input) => {
    const container = input.closest('.salto');
    const errorMsg = container.querySelector('.error-message');
    
    if (errorMsg) {
      errorMsg.remove();
    }
    
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
  };

  const validateField = (input) => {
    const value = input.value.trim();
    const label = input.previousElementSibling ? input.previousElementSibling.textContent.replace(':', '').trim() : 'Este campo';

    if (value === '' || value === 'Seleccionar una opcion') {
      showError(input, `El campo ${label} es obligatorio.`);
      return false;
    }

    if (input.type === 'text' && input.id === 'correo') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Por favor ingrese un correo válido.');
            return false;
        }
    }
    
    clearError(input);
    return true;
  };

  const inputs = form.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      clearError(input);
    });
  });

  form.addEventListener('submit', (e) => {
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault(); 
      const firstError = document.querySelector('.input-error');
      if (firstError) {
          firstError.focus();
      }
    } else {
        alert('Formulario validado correctamente. Enviando...');
    }
  });
});
