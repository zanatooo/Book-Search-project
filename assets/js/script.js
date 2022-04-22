document.getElementById("button").addEventListener("click", bookSearch, false); //getElementById() method returns an element with a specified value
const submitButton = document.querySelector("#submit"); //constant for submit button
const input = document.querySelector("#input"); // returns the first element that matches this CSS selector.
const errorSpan = document.querySelector("#error"); // returns the first element that matches this CSS selector.
const resultsContainer = document.querySelector("#results"); // returns the first element that matches this CSS selector.

const endpoint = "https://en.wikipedia.org/w/api.php?"; //store the url to constant variable endpoint.
//create a js object with name params with key value pair.
const params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "extracts",
  exchars: 250,
  exintro: true,
  explaintext: true,
  generator: "search",
  gsrlimit: 20,
};
//create the function to do disable for selector.
const disableUi = () => {
  input.disabled = true;
  submitButton.disabled = true;
};
//create the function to do enable for selector.
const enableUi = () => {
  input.disabled = false; //set the enable attribute to true.
  submitButton.disabled = false;
};

const clearPreviousResults = () => {
  resultsContainer.innerHTML = "";
  errorSpan.innerHTML = "";
};
//function to check input is empty or not.
const isInputEmpty = (input) => {
  if (!input || input === "") return true;
  return false;
};
// function to show errors
const showError = (error) => {
  errorSpan.innerHTML = `🚨 ${error} 🚨`;
};

const showResults = (results) => {
  results.forEach((result) => {
    //run the for each loop
    resultsContainer.innerHTML += `
        <div class="results__item">
            <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp">
                <h2 class="results__item__title">${result.title}</h2>
                <p class="results__item__intro">${result.intro}</p>
            </a>
        </div>
    `;
  });
};
//set the value one by one
const gatherData = (pages) => {
  const results = Object.values(pages).map((page) => ({
    //iterate the objects one by one and set the value
    pageId: page.pageid,
    title: page.title,
    intro: page.extract,
  }));

  showResults(results);
};

const getData = async () => {
  const userInput = input.value;
  if (isInputEmpty(userInput)) return;

  params.gsrsearch = userInput;
  clearPreviousResults(); //call the function
  disableUi(); // call the function
  // use of try catch
  // The try...catch statement marks a try block and a catch block.
  // If the code in the try block throws an exception then the code in the catch block will be executed.
  try {
    const { data } = await axios.get(endpoint, { params });

    if (data.error) throw new Error(data.error.info);
    gatherData(data.query.pages);
  } catch (error) {
    showError(error);
  } finally {
    enableUi();
  }
};

const handleKeyEvent = (e) => {
  if (e.key === "Enter") {
    // check the key if it is enetered or not
    getData(); // call the function
  }
};
// call the events on selectors
const registerEventHandlers = () => {
  input.addEventListener("keydown", handleKeyEvent);
  submitButton.addEventListener("click", getData);
};

registerEventHandlers();
// google book search api
function bookSearch() {
  var search = document.getElementById("search").value; // get the value of selector
  document.getElementById("results").innerHTML = ""; // do the empty of particular selector
  // call ajax
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
    dataType: "json",

    success: function (data) {
      for (i = 0; i < data.items.length; i++) {
        results.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "<h2>";
      }
    },
    type: "GET",
  });
}
