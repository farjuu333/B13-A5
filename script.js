

 // 1.element selector
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');
const issuesContainer = document.getElementById("issues-container");
const issueCountElement = document.querySelector("h2.text-\\[20px\\]"); 

// new feature selector

const loader = document.getElementById('loader');
const noResult = document.getElementById('no-result');

let allIssues = []; 

//remove button style
function clearSelection() {
    [allFilterBtn, openFilterBtn, closedFilterBtn].forEach(btn => {
        if(btn) {
            btn.classList.add('bg-white', 'text-slate-500');
            btn.classList.remove('bg-blue-600', 'text-white');
        }
    });
}

function toggleStyle(id) {
    clearSelection();
    const selected = document.getElementById(id);
    if (selected) {
        selected.classList.remove('bg-white', 'text-slate-500');
        selected.classList.add('bg-blue-600', 'text-white');
    }
}

// filter function
function filterByStatus(status) {
    let filtered = [];
    if (status === 'all') {
        toggleStyle('all-filter-btn');
        filtered = allIssues;
    } else {
        toggleStyle(status === 'open' ? 'open-filter-btn' : 'closed-filter-btn');
        filtered = allIssues.filter(i => i.status.toLowerCase() === status);
    }
    issueCountElement.innerText = `${filtered.length} Issues`;
    renderIssues(filtered);
}

// 4.data fetching main list
async function fetchIssues() {
    if(loader) loader.classList.remove('hidden');
    try {
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const result = await response.json();
        allIssues = result.data || result; // API response structure handle
        
        issueCountElement.innerText = `${allIssues.length} Issues`;
        renderIssues(allIssues);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        if(loader) loader.classList.add('hidden');
    }
}

// 5.card render function
function renderIssues(issues) {
    issuesContainer.innerHTML = ""; 
    if (!issues || issues.length === 0) {
        if(noResult) noResult.classList.remove('hidden');
        return;
    }
    if(noResult) noResult.classList.add('hidden');

    issues.forEach(issue => {
        const isOpen = issue.status.toLowerCase() === "open";
        const statusIcon = isOpen ? "Open-Status.png" : "Closed- Status .png";
        const topBorderClass = isOpen ? "border-t-emerald-500" : "border-t-purple-500";
        const statusType = isOpen ? 'open' : 'closed';

        // Priority Styles
        const priorityStyles = {
            'high': { bg: 'bg-[#FEECEC]', text: 'text-[#EF4444]' },
            'medium': { bg: 'bg-[#FFF6D1]', text: 'text-[#F59E0B]' },
            'low': { bg: 'bg-[#EEEFF2]', text: 'text-[#9CA3AF]' }
        };
        const pKey = issue.priority.toLowerCase();
        const pStyle = priorityStyles[pKey] || { bg: 'bg-gray-100', text: 'text-gray-600' };

        // label color logic
        const cardLabelsHTML = (issue.labels || []).map(l => {
            const labelText = l.toLowerCase().trim();
            let lBg = 'bg-[#FFF6D1]'; 
            let lText = 'text-[#F59E0B]';

            if (labelText === 'bug') { 
                lBg = 'bg-[#FEECEC]'; lText = 'text-[#EF4444]'; 
            } else if (labelText === 'enhancement') { 
                lBg = 'bg-[#D1FAE5]'; lText = 'text-[#10B981]'; 
            } else if (labelText === 'help wanted') { 
                lBg = 'bg-[#FFF6D1]'; lText = 'text-[#F59E0B]'; 
            }
            
            return `<span class="text-[10px] font-bold px-2 py-1 rounded uppercase ${lBg} ${lText}">${l}</span>`;
        }).join('');

        // card generation
        const card = `
        <div onclick="showIssueDetails(${issue.id})" class="bg-white rounded-lg shadow-sm p-5 border border-gray-100 border-t-4 ${topBorderClass} flex flex-col gap-3 relative cursor-pointer hover:shadow-md transition-all">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <button onclick="event.stopPropagation(); filterByStatus('${statusType}')">
                        <img src="./assets/${statusIcon}" alt="status" class="w-5 h-5">
                    </button>
                </div>
                <span class="text-[11px] font-bold uppercase px-2 py-0.5 rounded ${pStyle.bg} ${pStyle.text}">${issue.priority}</span>
            </div>
            
            <h3 class="text-base font-bold text-[#1F2937] leading-tight line-clamp-1">${issue.title}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">${issue.description}</p>
            
            <div class="flex flex-wrap gap-2 mt-1">
                ${cardLabelsHTML} 
            </div>

            <div class="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-1 text-[10px] text-gray-400">
                <div class="flex justify-between items-center">
                    <span>By ${issue.author}</span>
                    <span class="font-semibold text-gray-500">${issue.assignee}</span>
                </div>
                <span>Created: ${new Date(issue.createdAt).toLocaleDateString('en-GB')}</span>
            </div>
        </div>
        `;
        issuesContainer.innerHTML += card;
    });
}
// (Search API logic)
const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const searchText = e.target.value.trim();
        
        // if empty search box show all issues
        if (searchText === "") {
            renderIssues(allIssues);
            issueCountElement.innerText = `${allIssues.length} Issues`;
            return;
        }

        // show loader
        if (loader) loader.classList.remove('hidden');

        try {
            // search api
            const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
            const result = await response.json();
            
            
            const data = result.data || result;
            // match title
    const filteredByTitle = data.filter(issue => 
        issue.title.toLowerCase().includes(searchText.toLowerCase())
    );
            
            if (Array.isArray(filteredByTitle)) {
                issueCountElement.innerText = `${filteredByTitle.length} Results Found`;
                renderIssues(filteredByTitle);
            }
            clearSelection(); 
        } catch (error) {
            console.error("Search Error:", error);
        } finally {
            if (loader) loader.classList.add('hidden');
        }
    });
}
// modal 
async function showIssueDetails(id) {
    try {
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await response.json();
        const issue = result.data || result;

        const modalContainer = document.getElementById('modal-container');
        if (issue && modalContainer) {
            const isOpen = issue.status.toLowerCase() === 'open';
            
            
            const labelsHTML = issue.labels.map(label => {
                const lText = label.toLowerCase();
                let labelBg = 'bg-[#FFF6D1]'; let labelText = 'text-[#F59E0B]';
                if (lText === 'bug') { labelBg = 'bg-[#FEECEC]'; labelText = 'text-[#EF4444]'; }
                else if (lText === 'enhancement') { labelBg = 'bg-[#D1FAE5]'; labelText = 'text-[#10B981]'; }
                return `<span class="text-[10px] font-bold px-2 py-1 rounded uppercase ${labelBg} ${labelText}">${label}</span>`;
            }).join('');

            modalContainer.innerHTML = `
                <dialog id="details_modal" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box max-w-2xl p-8"> 
                        <div class="">
                            <h3 class="font-bold text-2xl text-[#1F2937]">${issue.title}</h3>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${isOpen ? 'bg-emerald-500' : 'bg-purple-500'}">${issue.status}</span>
                                <span class="text-gray-400 text-xs">• Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>

                            <div class="flex gap-2 mt-4">
                                ${labelsHTML}
                            </div>

                            <div class="bg-white py-6 rounded-lg my-4 text-gray-600 text-sm leading-relaxed">
                                ${issue.description}
                            </div>

                            <div class="flex gap-20 mt-4 border-t border-gray-50 pt-6">
                                <div>
                                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Assignee:</p>
                                    <p class="font-bold text-gray-800 text-base">${issue.assignee}</p>
                                </div>
                                <div>
                                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Priority:</p>
                                    <span class="px-3 py-1 rounded text-[10px] font-bold text-white uppercase bg-[#EF4444]">${issue.priority}</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-action mt-8">
                            <form method="dialog">
                                <button class="btn bg-[#4A00FF] hover:bg-indigo-700 text-white border-none px-10">Close</button>
                            </form>
                        </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            `;
            document.getElementById('details_modal').showModal();
        }
    } catch (error) {
        console.error("Modal API Error:", error);
    }
}

allFilterBtn.addEventListener('click', () => filterByStatus('all'));
openFilterBtn.addEventListener('click', () => filterByStatus('open'));
closedFilterBtn.addEventListener('click', () => filterByStatus('closed'));

fetchIssues();