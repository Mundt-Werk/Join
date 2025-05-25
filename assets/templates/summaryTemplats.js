function getTemplatesNumberOfTasks(statusCount){
    return  `
                <div class="task-container">
                <div class="task-content-1">
                  <a href="board.html" class="task-1">
                    <div class="single-content-1">
                      <img src="../assets/img/icons/summary/pen.png" alt="" />
                      <div class="task-info">
                        <span class="number-first-line">${statusCount["To-do"]}</span>
                        <span class="descriptions-first-line">To-do</span>
                      </div>
                    </div>
                  </a>

                  <a href="board.html" class="task-1-1">
                    <div class="single-content-1-1">
                      <img
                        src="../assets/img/icons/summary/marked.png"
                        alt=""
                      />
                      <div class="task-info">
                        <span class="number-first-line">${statusCount["Done"]}</span>
                        <span class="descriptions-first-line">Done</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="task-content-2">
                  <a href="board.html" class="task-2">
                    <div class="single-content-2">
                      <img
                        src="../assets/img/icons/summary/urgent.png"
                        alt=""
                      />
                      <div class="task-info">
                        <span class="number-urgent">${statusCount["Urgent"]}</span>
                        <span class="descriptions-urgent">Urgent</span>
                      </div>
                    </div>
                    <div class="border-2"></div>
                    <div class="urgent-info">
                      <span class="urgent-dead-time">Obctober 16, 2024</span>
                      <span class="urgent-deadline">Upcoming Deadline</span>
                    </div>
                  </a>
                </div>

                <div class="task-content-3">
                  <a href="board.html" class="task-3">
                    <div class="single-content-3">
                      <span class="number-last-line">${tasks.length}</span>
                      <span class="descriptions-last-line"
                        >Tasks in <br />
                        Board</span
                      >
                    </div>
                  </a>

                  <a href="board.html" class="task-3">
                    <div class="single-content-3">
                      <span class="number-last-line">${statusCount["In progress"]}</span>
                      <span class="descriptions-last-line"
                        >Tasks in <br />
                        Progress</span
                      >
                    </div>
                  </a>

                  <a href="board.html" class="task-3">
                    <div class="single-content-3">
                      <span class="number-last-line">${statusCount["Awaiting feedback"]}</span>
                      <span class="descriptions-last-line">Awaiting feedback</span>
                    </div>
                  </a>
                </div>
              </div>
              <aside class="greeting-container">
                <div class="hello-container">
                  <span class="greeting-time" id="greeting-time-main-menu"></span>
                  <span class="greeting-name" id="greeting-name-main-menu"></span>
                </div>
              </aside>
  `;
}