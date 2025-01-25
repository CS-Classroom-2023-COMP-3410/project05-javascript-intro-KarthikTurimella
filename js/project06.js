const periodicTableContainer = document.getElementById("periodic-table");
const searchInput = document.getElementById("search");
const elementDetails = document.getElementById("element-details");
const detailsElement = document.getElementById("details");

const elements = [
  { number: 1, symbol: "H", name: "Hydrogen", group: "Nonmetal" },
  { number: 2, symbol: "He", name: "Helium", group: "Noble Gas" },
  { number: 3, symbol: "Li", name: "Lithium", group: "Alkali Metal" },
  { number: 4, symbol: "Be", name: "Beryllium", group: "Alkaline Earth Metal" },
  { number: 5, symbol: "B", name: "Boron", group: "Metalloid" },
  { number: 6, symbol: "C", name: "Carbon", group: "Nonmetal" },
  { number: 7, symbol: "N", name: "Nitrogen", group: "Nonmetal" },
  { number: 8, symbol: "O", name: "Oxygen", group: "Nonmetal" },
  { number: 9, symbol: "F", name: "Fluorine", group: "Halogen" },
  { number: 10, symbol: "Ne", name: "Neon", group: "Noble Gas" },
  { number: 11, symbol: "Na", name: "Sodium", group: "Alkali Metal" },
  { number: 12, symbol: "Mg", name: "Magnesium", group: "Alkaline Earth Metal" },
  { number: 13, symbol: "Al", name: "Aluminum", group: "Post-Transition Metal" },
  { number: 14, symbol: "Si", name: "Silicon", group: "Metalloid" },
  { number: 15, symbol: "P", name: "Phosphorus", group: "Nonmetal" },
  { number: 16, symbol: "S", name: "Sulfur", group: "Nonmetal" },
  { number: 17, symbol: "Cl", name: "Chlorine", group: "Halogen" },
  { number: 18, symbol: "Ar", name: "Argon", group: "Noble Gas" },
  { number: 19, symbol: "K", name: "Potassium", group: "Alkali Metal" },
  { number: 20, symbol: "Ca", name: "Calcium", group: "Alkaline Earth Metal" },
  { number: 21, symbol: "Sc", name: "Scandium", group: "Transition Metal" },
  { number: 22, symbol: "Ti", name: "Titanium", group: "Transition Metal" },
  { number: 23, symbol: "V", name: "Vanadium", group: "Transition Metal" },
  { number: 24, symbol: "Cr", name: "Chromium", group: "Transition Metal" },
  { number: 25, symbol: "Mn", name: "Manganese", group: "Transition Metal" },
  { number: 26, symbol: "Fe", name: "Iron", group: "Transition Metal" },
  { number: 27, symbol: "Co", name: "Cobalt", group: "Transition Metal" },
  { number: 28, symbol: "Ni", name: "Nickel", group: "Transition Metal" },
  { number: 29, symbol: "Cu", name: "Copper", group: "Transition Metal" },
  { number: 30, symbol: "Zn", name: "Zinc", group: "Transition Metal" },
  { number: 31, symbol: "Ga", name: "Gallium", group: "Post-Transition Metal" },
  { number: 32, symbol: "Ge", name: "Germanium", group: "Metalloid" },
  { number: 33, symbol: "As", name: "Arsenic", group: "Metalloid" },
  { number: 34, symbol: "Se", name: "Selenium", group: "Nonmetal" },
  { number: 35, symbol: "Br", name: "Bromine", group: "Halogen" },
  { number: 36, symbol: "Kr", name: "Krypton", group: "Noble Gas" },
  { number: 37, symbol: "Rb", name: "Rubidium", group: "Alkali Metal" },
  { number: 38, symbol: "Sr", name: "Strontium", group: "Alkaline Earth Metal" },
  { number: 39, symbol: "Y", name: "Yttrium", group: "Transition Metal" },
  { number: 40, symbol: "Zr", name: "Zirconium", group: "Transition Metal" },
  { number: 41, symbol: "Nb", name: "Niobium", group: "Transition Metal" },
  { number: 42, symbol: "Mo", name: "Molybdenum", group: "Transition Metal" },
  { number: 43, symbol: "Tc", name: "Technetium", group: "Transition Metal" },
  { number: 44, symbol: "Ru", name: "Ruthenium", group: "Transition Metal" },
  { number: 45, symbol: "Rh", name: "Rhodium", group: "Transition Metal" },
  { number: 46, symbol: "Pd", name: "Palladium", group: "Transition Metal" },
  { number: 47, symbol: "Ag", name: "Silver", group: "Transition Metal" },
  { number: 48, symbol: "Cd", name: "Cadmium", group: "Transition Metal" },
  { number: 49, symbol: "In", name: "Indium", group: "Post-Transition Metal" },
  { number: 50, symbol: "Sn", name: "Tin", group: "Post-Transition Metal" },
  { number: 51, symbol: "Sb", name: "Antimony", group: "Metalloid" },
  { number: 52, symbol: "Te", name: "Tellurium", group: "Metalloid" },
  { number: 53, symbol: "I", name: "Iodine", group: "Halogen" },
  { number: 54, symbol: "Xe", name: "Xenon", group: "Noble Gas" },
  { number: 55, symbol: "Cs", name: "Caesium", group: "Alkali Metal" },
  { number: 56, symbol: "Ba", name: "Barium", group: "Alkaline Earth Metal" },
  // Add remaining elements if needed, I am not adding now as that is not point of assignment.
];

// Generate periodic table grid
function generateTable() {
  periodicTableContainer.innerHTML = "";
  elements.forEach((element) => {
    const cell = document.createElement("div");
    cell.classList.add("element");
    cell.dataset.number = element.number;
    cell.dataset.name = element.name.toLowerCase();
    cell.dataset.symbol = element.symbol.toLowerCase();
    cell.dataset.group = element.group.toLowerCase();

    cell.innerHTML = `
      <p class="atomic-number">${element.number}</p>
      <p class="symbol">${element.symbol}</p>
      <p class="name">${element.name}</p>
    `;

    cell.addEventListener("click", () => displayDetails(element));
    periodicTableContainer.appendChild(cell);
  });
}

// Display element details
function displayDetails(element) {
  elementDetails.style.display = "block";
  detailsElement.innerHTML = `
    <strong>Atomic Number:</strong> ${element.number}<br>
    <strong>Symbol:</strong> ${element.symbol}<br>
    <strong>Name:</strong> ${element.name}<br>
    <strong>Group:</strong> ${element.group}
  `;
}

// Filter elements by search input
function filterElements() {
  const query = searchInput.value.toLowerCase();
  const cells = document.querySelectorAll(".element");

  cells.forEach((cell) => {
    const matches =
      cell.dataset.name.includes(query) ||
      cell.dataset.symbol.includes(query) ||
      cell.dataset.number.includes(query);

    cell.style.display = matches ? "flex" : "none";
  });
}

// Event listener for search input
searchInput.addEventListener("input", filterElements);

// Initialize periodic table
generateTable();
