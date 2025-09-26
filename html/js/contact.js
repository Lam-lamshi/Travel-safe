const tgg_btn =document.querySelector(".tgg_btn")
		const tgg_btnIcon =document.querySelector(".tgg_btn i")
		const dropdown_menu =document.querySelector(".dropdown_menu")


		tgg_btn.onclick=function() {
		dropdown_menu.classList.toggle("open")
		const isOpen = dropdown_menu.classList.contains("open")

		tgg_btnIcon.classList =isOpen
		? "fa-solid fa-close"
		: "fa-solid fa-bars"

		alert("sent successfully");
		document.location.href ="send.php";
	}
function initializeContact() {
  setupContactForm();
  setupFormValidation();
}

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Add real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function setupFormValidation() {
  // Add validation styles
  const style = document.createElement('style');
  style.textContent = `
    .form-group.error input,
    .form-group.error textarea {
      border-color: hsl(var(--destructive));
      box-shadow: 0 0 0 2px hsl(var(--destructive) / 0.2);
    }
    
    .form-group.success input,
    .form-group.success textarea {
      border-color: hsl(var(--forest-green));
      box-shadow: 0 0 0 2px hsl(var(--forest-green) / 0.2);
    }
    
    .field-error {
      color: hsl(var(--destructive));
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
    
    .field-success {
      color: hsl(var(--forest-green));
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
  `;
  document.head.appendChild(style);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = document.getElementById('submit-btn');
  
  // Validate all fields
  const isValid = validateForm(form);
  
  if (!isValid) {
    showToast('Validation Error', 'Please correct the errors and try again.', 3000);
    return;
  }
  
  // Show loading state
  setSubmitButtonLoading(true);
  
  // Simulate form submission
  setTimeout(() => {
    // Success
    showToast(
      'Message sent successfully!',
      'Thank you for contacting us. We\'ll get back to you within 24 hours.',
      5000
    );
    
    // Reset form
    form.reset();
    clearAllFieldStates(form);
    setSubmitButtonLoading(false);
    
    // Optional: Scroll to top of contact section
    document.getElementById('contact').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, 2000);
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';
  
  // Required field validation
  if (field.required && !value) {
    isValid = false;
    errorMessage = `${getFieldLabel(fieldName)} is required.`;
  }
  // Email validation
  else if (fieldType === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  }
  // Name validation
  else if (fieldName === 'fullName' && value) {
    if (value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters long.';
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      isValid = false;
      errorMessage = 'Name can only contain letters and spaces.';
    }
  }
  // Message validation
  else if (fieldName === 'message' && value) {
    if (value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    } else if (value.length > 1000) {
      isValid = false;
      errorMessage = 'Message must be less than 1000 characters.';
    }
  }
  
  // Update field state
  updateFieldState(field, isValid, errorMessage);
  
  return isValid;
}

function updateFieldState(field, isValid, errorMessage = '') {
  const formGroup = field.closest('.form-group');
  
  if (!formGroup) return;
  
  // Remove existing state classes and messages
  formGroup.classList.remove('error', 'success');
  const existingMessage = formGroup.querySelector('.field-error, .field-success');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  if (field.value.trim()) {
    if (isValid) {
      formGroup.classList.add('success');
      const successMessage = document.createElement('span');
      successMessage.className = 'field-success';
      successMessage.textContent = '✓ Looks good!';
      formGroup.appendChild(successMessage);
    } else {
      formGroup.classList.add('error');
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.textContent = errorMessage;
      formGroup.appendChild(errorElement);
    }
  }
}

function clearFieldError(field) {
  const formGroup = field.closest('.form-group');
  
  if (formGroup && formGroup.classList.contains('error')) {
    formGroup.classList.remove('error');
    const errorMessage = formGroup.querySelector('.field-error');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

function clearAllFieldStates(form) {
  const formGroups = form.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.classList.remove('error', 'success');
    const messages = group.querySelectorAll('.field-error, .field-success');
    messages.forEach(message => message.remove());
  });
}

function getFieldLabel(fieldName) {
  const labels = {
    fullName: 'Full Name',
    email: 'Email Address',
    message: 'Message'
  };
  return labels[fieldName] || fieldName;
}

function setSubmitButtonLoading(isLoading) {
  const submitBtn = document.getElementById('submit-btn');
  
  if (!submitBtn) return;
  
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Sending...</span>
    `;
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <i data-lucide="send" style="width: 1.25rem; height: 1.25rem;"></i>
      <span>Send Message</span>
    `;
    
    // Recreate Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Character counter for textarea
function addCharacterCounter() {
  const messageField = document.getElementById('message');
  
  if (!messageField) return;
  
  const maxLength = 1000;
  const formGroup = messageField.closest('.form-group');
  
  // Create counter element
  const counter = document.createElement('div');
  counter.className = 'character-counter';
  counter.style.cssText = `
    text-align: right;
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    margin-top: 0.25rem;
  `;
  
  // Update counter
  function updateCounter() {
    const length = messageField.value.length;
    counter.textContent = `${length}/${maxLength}`;
    
    if (length > maxLength * 0.9) {
      counter.style.color = 'hsl(var(--destructive))';
    } else {
      counter.style.color = 'hsl(var(--muted-foreground))';
    }
  }
  
  messageField.addEventListener('input', updateCounter);
  formGroup.appendChild(counter);
  updateCounter();
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', () => {
  addCharacterCounter();
});