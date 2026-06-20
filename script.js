const searchInput = document.getElementById('searchInput');
const resultsCount = document.getElementById('resultsCount');
const clearBtn = document.getElementById('clearBtn');

function normalize(s){
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function getTextFromAccordion(details){
  const keywords = details.getAttribute('data-keywords') || '';
  const summary = details.querySelector('summary')?.innerText || '';
  const bodyText = details.innerText || '';
  return normalize(`${keywords} ${summary} ${bodyText}`);
}

function filterAccordions(){
  const query = normalize(searchInput.value);

  const accordions = Array.from(document.querySelectorAll('.accordion'));
  let visible = 0;

  accordions.forEach(acc => {
    const haystack = getTextFromAccordion(acc);

    const match = query.length === 0 ? true : haystack.includes(query);

    acc.style.display = match ? '' : 'none';
    if(match) visible++;
  });

  resultsCount.textContent = `${visible} resultados`;
}

clearBtn?.addEventListener('click', () => {
  searchInput.value = '';
  filterAccordions();
});

searchInput?.addEventListener('input', filterAccordions);

// Inicial
filterAccordions();