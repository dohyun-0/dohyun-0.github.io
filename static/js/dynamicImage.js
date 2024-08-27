document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.getElementById('img');

    function getCornerColors(img) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);

        const corners = [
            { x: 0, y: 0 }, // 왼쪽 위
            { x: img.width - 1, y: 0 }, // 오른쪽 위
            { x: 0, y: img.height - 1 }, // 왼쪽 아래
            { x: img.width - 1, y: img.height - 1 } // 오른쪽 아래
        ];

        return corners.map(corner => {
            const pixelData = context.getImageData(corner.x, corner.y, 1, 1).data;
            return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        });
    }

    function applyCornerShadows(colors) {
        imgElement.style.boxShadow = `
            -10px -10px 15px ${colors[0]},  /* 왼쪽 위 */
             10px -10px 15px ${colors[1]},  /* 오른쪽 위 */
            -10px  10px 15px ${colors[2]},  /* 왼쪽 아래 */
             10px  10px 15px ${colors[3]}   /* 오른쪽 아래 */
        `;
    }

    // hover 상태에서 그림자 적용
    imgElement.addEventListener('mouseenter', function () {
        const cornerColors = getCornerColors(imgElement);
        applyCornerShadows(cornerColors);
        imgElement.classList.add('hover-shadow'); // 그림자 클래스를 추가
    });

    // hover 상태 해제 시 그림자 제거
    imgElement.addEventListener('mouseleave', function () {
        imgElement.style.boxShadow = 'none'; // 그림자 제거
        imgElement.classList.remove('hover-shadow'); // 그림자 클래스를 제거
    });

    // 캐시된 이미지의 경우에도 load 이벤트 트리거
    if (imgElement.complete) {
        imgElement.dispatchEvent(new Event('load'));
    }
});
