

function getCounts() {
    const counts = {};
    SIZES.forEach(size => {
        counts[size] = $(`.project-column .issue-card button[data-card-filter='label:\"size: ${size}\"']`).length
    })
    return counts;
}

function addSprintStatus() {
    $(".project-header-controls").before(`
        <div class="d-sm-flex flex-row flex-items-center f3 sprint-status">
        </div>
    `);
}

function updateSprintStatus(counts) {
    if ($(".sprint-status").length === 0) {
        addSprintStatus();
    }

    SIZES.forEach(size => {
        const sizeCounter = $(`.sprint-status .size-counter [data-size-counter=${size}]`);
        if (sizeCounter.length !== 0) {
            sizeCounter.text(`${size}: ${counts[size]}`)
        } else {
            $(".sprint-status").append(`
                <div class="size-counter">
                    <div class="Counter mr-1" data-size-counter="${size}">${size}: ${counts[size]}</div>
                </div>
            `)
        }
    });

    const totalCounter = $(`.sprint-status .total-counter .Counter`);
    const totalDays = getTotalDays(counts);
    if (totalCounter.length !== 0) {
        totalCounter.text(`${totalDays} Days`);
    } else {
        $(".sprint-status").append(`
            <div class="total-counter">
                <div class="Counter bg-green text-white">${totalDays} Days</div>
            </div>
        `)
    }

}

// updateSprintStatus(getCounts());

setInterval(() => updateSprintStatus(getCounts()),1500)



