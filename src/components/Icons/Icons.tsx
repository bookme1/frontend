const Icons = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <symbol id="arrow_right" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5L15 12L9 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="heart" viewBox="0 0 98 74" fill="none">
            <path
              d="M45.3366 1.59065C43.4527 2.18864 41.9402 3.66274 41.2389 5.54014C40.9639 6.27719 40.9364 6.68048 40.8676 11.0055L40.7989 15.692L39.6988 14.7881C38.4338 13.759 36.0824 12.5352 34.5423 12.1041C33.0023 11.673 30.5271 11.4644 29.3308 11.6452C26.1819 12.1458 23.9543 14.7185 23.9543 17.8614C23.9543 21.3659 26.7045 24.1889 30.1284 24.2029C31.3797 24.2029 32.3147 24.8148 32.5485 25.7743C32.631 26.0663 32.5072 26.3028 31.8885 27.0815C27.5845 32.4912 26.1132 39.7505 27.9558 46.4257C28.2995 47.6634 32.2735 59.0529 32.8785 60.5131C35.2849 66.3539 40.3451 70.6233 46.6429 72.1391C48.7742 72.6536 52.5007 72.7371 54.8245 72.3477C58.9772 71.6245 62.4699 69.8167 65.4263 66.8406C67.1451 65.0884 68.3414 63.3918 69.3452 61.278C70.1565 59.5257 74.4192 47.3852 74.8042 45.6886C74.9692 44.9933 75.1617 43.8669 75.258 43.1854C75.478 41.4888 75.3405 37.9983 74.983 36.3295C74.0892 32.0879 71.9853 28.1523 69.0702 25.2459L68.0939 24.2863L68.9602 24.1055C70.9265 23.7022 72.5216 22.4645 73.4154 20.6428C73.8279 19.7666 73.9104 19.4607 73.9792 18.3621C74.1304 15.5946 72.8654 13.3696 70.5002 12.2292C69.1939 11.6034 68.3826 11.5061 64.7937 11.5895C61.9198 11.6452 61.4111 11.7008 60.2423 12.0067C57.7947 12.6603 55.7183 13.7451 54.1095 15.2192L53.3807 15.8867V11.3114C53.3807 6.36063 53.3257 5.92952 52.6107 4.58058C51.8544 3.18991 50.5618 2.1191 49.0768 1.64628C48.128 1.35424 46.1754 1.32642 45.3366 1.59065ZM48.3892 6.15203C49.393 7.09768 49.3518 8.33537 48.293 9.23931C47.2479 10.1154 45.4466 9.39228 45.1853 8.00162C44.8691 6.23547 47.1104 4.94215 48.3892 6.15203ZM47.1242 13.9119C47.7292 13.9119 48.4305 13.8563 48.678 13.7868L49.118 13.6477V28.1941L47.8529 28.3053C46.3679 28.4166 44.4428 28.8894 43.2877 29.4039C41.3626 30.2662 39.0663 32.1992 37.8562 33.9931C37.1275 35.0639 36.2199 37.1221 35.9036 38.4711C35.5049 40.0703 35.4774 42.8378 35.8349 44.298C36.1787 45.7582 39.3138 55.6319 39.7126 56.5497C40.8401 59.1225 43.0402 61.4588 45.4741 62.6826C48.733 64.3235 52.8857 64.4765 56.2821 63.0719C59.2385 61.8621 61.9336 59.0668 63.0749 56.063C63.8449 53.9909 66.7051 44.6317 66.8563 43.6444C67.0763 42.2676 66.9663 39.4724 66.6363 38.2486C65.9213 35.5229 64.1062 32.6442 62.1949 31.2257L61.6311 30.8085L61.6448 28.4444C61.6586 26.0385 61.7273 25.4405 62.0024 25.3571C62.0849 25.3293 62.7036 25.677 63.3912 26.1359C67.1038 28.653 69.6202 32.3382 70.7203 36.8579C71.1465 38.638 71.1878 42.2815 70.8028 44.0894C70.4727 45.5774 66.3338 57.4954 65.5638 59.192C64.8212 60.7913 64.2162 61.723 63.1437 62.9885C60.2698 66.3678 55.9383 68.3008 51.3181 68.3008C47.0692 68.3008 43.4252 66.8685 40.5101 64.0871C39.1075 62.7521 37.98 61.1806 37.155 59.4701C36.4399 57.9543 32.411 46.5369 31.9435 44.7152C30.5409 39.1108 32.191 32.9501 36.2474 28.6808C38.3513 26.4696 40.7026 24.9816 43.6453 24.0082L45.0616 23.5353L45.1028 18.5985L45.1303 13.6477L45.5841 13.7868C45.8179 13.8563 46.5191 13.9119 47.1242 13.9119ZM33.2773 16.2761C34.2536 16.5542 35.7111 17.2356 36.5087 17.778C37.43 18.4177 39.3551 20.5315 39.3551 20.9209C39.3551 21.0043 39.0113 21.2546 38.585 21.4632C38.1588 21.6858 37.4437 22.103 36.9899 22.395C36.5362 22.7009 36.1374 22.9513 36.0824 22.9513C36.0274 22.9513 35.8074 22.7009 35.6011 22.395C34.5698 20.9209 32.4797 19.9057 30.4859 19.8918C28.1758 19.8918 27.3508 17.2217 29.3308 16.1648C29.8671 15.8728 30.0596 15.845 31.1047 15.9145C31.751 15.9562 32.7273 16.1231 33.2773 16.2761ZM68.6439 16.1648C70.0465 16.9019 70.1015 18.7793 68.7539 19.6137C67.7914 20.1977 66.5951 19.8084 66.0588 18.7515C65.8113 18.2647 65.7563 18.0005 65.8388 17.6111C65.99 16.7211 66.9251 15.8867 67.7501 15.8589C67.9151 15.8589 68.3139 15.9979 68.6439 16.1648ZM61.7273 16.3178C61.4523 17.0409 61.5211 19.0713 61.8511 19.9335C61.8923 20.0448 61.5623 20.2673 61.0536 20.5037C60.1185 20.9348 58.9085 22.0056 58.3722 22.8678C57.5196 24.2168 57.4646 24.6061 57.3959 29.0702L57.3409 33.1866L58.4134 33.868C60.8748 35.4394 62.4424 37.9009 62.6899 40.571L62.7724 41.5166L61.8923 40.71C60.9161 39.8061 59.3072 38.9439 57.9184 38.5684C57.1346 38.3459 56.3233 38.3181 51.2494 38.3181C44.8828 38.3181 44.7453 38.332 42.834 39.2499C41.8852 39.6949 39.9051 41.2107 39.9051 41.4749C39.9051 41.5584 39.8638 41.6001 39.8226 41.5584C39.7813 41.5027 39.8226 40.9743 39.9051 40.3763C40.4139 36.9135 42.7652 34.0905 46.0104 33.0058C47.0554 32.6581 47.3304 32.6303 50.2593 32.5747L53.3807 32.519V29.2788C53.3807 27.4848 53.4495 25.5518 53.532 24.9538C53.917 22.103 55.4571 19.4885 57.6984 17.8892C58.7297 17.1383 59.2522 16.8741 60.3935 16.4708C61.4386 16.0953 61.8236 16.0536 61.7273 16.3178ZM56.5709 42.7126C58.0834 43.0325 59.596 44.1728 60.2423 45.4661C60.696 46.3562 60.9848 47.6773 60.9023 48.4282C60.7923 49.2765 59.2385 54.2273 58.771 55.1452C57.9047 56.8835 56.2133 58.4688 54.4945 59.1225C52.0881 60.0403 49.8468 59.9429 47.4679 58.7887C46.0654 58.1212 44.7453 56.8696 44.0028 55.4928C43.7278 54.9922 43.109 53.3651 42.6277 51.8771C41.8302 49.36 41.7614 49.0679 41.7614 47.9137C41.7614 46.8429 41.8164 46.5508 42.1327 45.8555C42.8477 44.3258 44.4428 43.0186 45.9966 42.6987C46.9042 42.5179 55.7183 42.5318 56.5709 42.7126Z"
              fill="#7882DA"
            />
          </symbol>
          <symbol id="modal-close" viewBox="0 0 35 35" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="34"
              height="34"
              rx="5.5"
              fill="white"
              stroke="#FF3F56"
            />
            <path
              d="M23.9998 24L10.9998 11"
              stroke="#FF3F56"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10.9998 24L23.9998 11"
              stroke="#FF3F56"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </symbol>
          <symbol id="modal_confirm" viewBox="0 0 24 23" fill="none">
            <circle
              cx="11.5"
              cy="11.5"
              r="10.5"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M7 9.65789L11.5283 14L23 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="date_white" viewBox="0 0 23 22" fill="none">
            <path
              d="M5 5H3C1.89543 5 1 5.89543 1 7V19C1 20.1046 1.89543 21 3 21H20C21.1046 21 22 20.1046 22 19V7C22 5.89543 21.1046 5 20 5H18M5 5V0M5 5H18M18 5V0"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="5.5" cy="10.5" r="1.5" fill="currentColor" />
            <circle cx="5.5" cy="15.5" r="1.5" fill="currentColor" />
            <circle cx="11.5" cy="10.5" r="1.5" fill="currentColor" />
            <circle cx="11.5" cy="15.5" r="1.5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" />
            <circle cx="17.5" cy="15.5" r="1.5" fill="currentColor" />
          </symbol>
          <symbol id="arrow_left" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 5L9 12L15 19"
              stroke="#1F171E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="arrow_right" viewBox="0 0 24 24">
            <path
              d="M9 5L15 12L9 19"
              stroke="#1F171E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="logo_white" viewBox="0 0 179 40">
            <g clipPath="url(#clip0_258_14356)">
              <path
                d="M64.6124 31.257C64.6124 32.857 64.1991 34.2036 63.3724 35.297C62.5458 36.3636 61.4258 37.177 60.0124 37.737C58.6258 38.297 57.1058 38.577 55.4524 38.577H41.7324V10.177H56.9324C58.2658 10.177 59.4124 10.537 60.3724 11.257C61.3591 11.9503 62.1058 12.857 62.6124 13.977C63.1458 15.0703 63.4124 16.217 63.4124 17.417C63.4124 18.777 63.0658 20.0703 62.3724 21.297C61.6791 22.5236 60.6658 23.4303 59.3324 24.017C60.9591 24.497 62.2391 25.3636 63.1724 26.617C64.1324 27.8703 64.6124 29.417 64.6124 31.257ZM59.0524 30.217C59.0524 29.497 58.9058 28.857 58.6124 28.297C58.3191 27.7103 57.9191 27.257 57.4124 26.937C56.9324 26.5903 56.3724 26.417 55.7324 26.417H47.2524V33.897H55.4524C56.1191 33.897 56.7191 33.737 57.2524 33.417C57.8124 33.0703 58.2524 32.617 58.5724 32.057C58.8924 31.497 59.0524 30.8836 59.0524 30.217ZM47.2524 14.897V22.057H54.6124C55.2258 22.057 55.7858 21.9103 56.2924 21.617C56.7991 21.3236 57.1991 20.9103 57.4924 20.377C57.8124 19.8436 57.9724 19.2036 57.9724 18.457C57.9724 17.737 57.8258 17.1103 57.5324 16.577C57.2658 16.0436 56.8924 15.6303 56.4124 15.337C55.9591 15.0436 55.4391 14.897 54.8524 14.897H47.2524Z"
                fill="#1F171E"
              />
              <path
                d="M78.0799 38.977C76.3733 38.977 74.8399 38.697 73.4799 38.137C72.1199 37.5503 70.9599 36.7503 69.9999 35.737C69.0666 34.7236 68.3466 33.5636 67.8399 32.257C67.3333 30.9503 67.0799 29.577 67.0799 28.137C67.0799 26.6703 67.3333 25.2836 67.8399 23.977C68.3466 22.6703 69.0666 21.5103 69.9999 20.497C70.9599 19.4836 72.1199 18.697 73.4799 18.137C74.8399 17.5503 76.3733 17.257 78.0799 17.257C79.7866 17.257 81.3066 17.5503 82.6399 18.137C83.9999 18.697 85.1599 19.4836 86.1199 20.497C87.0799 21.5103 87.7999 22.6703 88.2799 23.977C88.7866 25.2836 89.0399 26.6703 89.0399 28.137C89.0399 29.577 88.7866 30.9503 88.2799 32.257C87.7999 33.5636 87.0799 34.7236 86.1199 35.737C85.1866 36.7503 84.0399 37.5503 82.6799 38.137C81.3199 38.697 79.7866 38.977 78.0799 38.977ZM72.5999 28.137C72.5999 29.3636 72.8399 30.457 73.3199 31.417C73.7999 32.3503 74.4533 33.0836 75.2799 33.617C76.1066 34.1503 77.0399 34.417 78.0799 34.417C79.0933 34.417 80.0133 34.1503 80.8399 33.617C81.6666 33.057 82.3199 32.3103 82.7999 31.377C83.3066 30.417 83.5599 29.3236 83.5599 28.097C83.5599 26.897 83.3066 25.817 82.7999 24.857C82.3199 23.897 81.6666 23.1503 80.8399 22.617C80.0133 22.0836 79.0933 21.817 78.0799 21.817C77.0399 21.817 76.1066 22.097 75.2799 22.657C74.4533 23.1903 73.7999 23.937 73.3199 24.897C72.8399 25.8303 72.5999 26.9103 72.5999 28.137Z"
                fill="#1F171E"
              />
              <path
                d="M102.338 38.977C100.631 38.977 99.0977 38.697 97.7377 38.137C96.3777 37.5503 95.2177 36.7503 94.2577 35.737C93.3244 34.7236 92.6044 33.5636 92.0977 32.257C91.5911 30.9503 91.3377 29.577 91.3377 28.137C91.3377 26.6703 91.5911 25.2836 92.0977 23.977C92.6044 22.6703 93.3244 21.5103 94.2577 20.497C95.2177 19.4836 96.3777 18.697 97.7377 18.137C99.0977 17.5503 100.631 17.257 102.338 17.257C104.044 17.257 105.564 17.5503 106.898 18.137C108.258 18.697 109.418 19.4836 110.378 20.497C111.338 21.5103 112.058 22.6703 112.538 23.977C113.044 25.2836 113.298 26.6703 113.298 28.137C113.298 29.577 113.044 30.9503 112.538 32.257C112.058 33.5636 111.338 34.7236 110.378 35.737C109.444 36.7503 108.298 37.5503 106.938 38.137C105.578 38.697 104.044 38.977 102.338 38.977ZM96.8577 28.137C96.8577 29.3636 97.0977 30.457 97.5777 31.417C98.0577 32.3503 98.7111 33.0836 99.5377 33.617C100.364 34.1503 101.298 34.417 102.338 34.417C103.351 34.417 104.271 34.1503 105.098 33.617C105.924 33.057 106.578 32.3103 107.058 31.377C107.564 30.417 107.818 29.3236 107.818 28.097C107.818 26.897 107.564 25.817 107.058 24.857C106.578 23.897 105.924 23.1503 105.098 22.617C104.271 22.0836 103.351 21.817 102.338 21.817C101.298 21.817 100.364 22.097 99.5377 22.657C98.7111 23.1903 98.0577 23.937 97.5777 24.897C97.0977 25.8303 96.8577 26.9103 96.8577 28.137Z"
                fill="#1F171E"
              />
              <path
                d="M131.236 38.577L125.116 29.537L122.276 32.337V38.577H116.916V9.37695H122.276V27.057L130.716 17.657H136.396L128.596 26.537L136.956 38.577H131.236Z"
                fill="#1F171E"
              />
              <path
                d="M162.95 38.5005H160.75V31.2005C160.75 29.8339 160.525 28.8255 160.075 28.1755C159.642 27.5255 158.992 27.2005 158.125 27.2005C157.242 27.2005 156.442 27.5255 155.725 28.1755C155.008 28.8089 154.5 29.6339 154.2 30.6505V38.5005H152V31.2005C152 29.8172 151.783 28.8089 151.35 28.1755C150.917 27.5255 150.267 27.2005 149.4 27.2005C148.533 27.2005 147.733 27.5172 147 28.1505C146.283 28.7672 145.775 29.5922 145.475 30.6255V38.5005H143.275V25.4505H145.275V28.2505C145.808 27.2839 146.5 26.5422 147.35 26.0255C148.2 25.4922 149.158 25.2255 150.225 25.2255C151.308 25.2255 152.175 25.5255 152.825 26.1255C153.475 26.7089 153.875 27.4672 154.025 28.4005C154.608 27.3672 155.317 26.5839 156.15 26.0505C156.983 25.5005 157.933 25.2255 159 25.2255C159.75 25.2255 160.375 25.3672 160.875 25.6505C161.392 25.9172 161.8 26.3005 162.1 26.8005C162.4 27.2839 162.617 27.8589 162.75 28.5255C162.883 29.1922 162.95 29.9172 162.95 30.7005V38.5005Z"
                fill="#1F171E"
              />
              <path
                d="M172.146 38.7505C171.162 38.7505 170.262 38.5755 169.446 38.2255C168.646 37.8589 167.946 37.3672 167.346 36.7505C166.762 36.1172 166.304 35.3922 165.971 34.5755C165.654 33.7589 165.496 32.8922 165.496 31.9755C165.496 30.7422 165.779 29.6172 166.346 28.6005C166.912 27.5839 167.696 26.7672 168.696 26.1505C169.712 25.5339 170.871 25.2255 172.171 25.2255C173.487 25.2255 174.629 25.5422 175.596 26.1755C176.579 26.7922 177.337 27.6089 177.871 28.6255C178.421 29.6255 178.696 30.7089 178.696 31.8755C178.696 32.0422 178.687 32.2089 178.671 32.3755C178.671 32.5255 178.662 32.6422 178.646 32.7255H167.821C167.887 33.5755 168.121 34.3339 168.521 35.0005C168.937 35.6505 169.471 36.1672 170.121 36.5505C170.771 36.9172 171.471 37.1005 172.221 37.1005C173.021 37.1005 173.771 36.9005 174.471 36.5005C175.187 36.1005 175.679 35.5755 175.946 34.9255L177.846 35.4505C177.562 36.0839 177.137 36.6505 176.571 37.1505C176.021 37.6505 175.362 38.0422 174.596 38.3255C173.846 38.6089 173.029 38.7505 172.146 38.7505ZM167.746 31.2005H176.646C176.579 30.3505 176.337 29.6005 175.921 28.9505C175.504 28.3005 174.971 27.7922 174.321 27.4255C173.671 27.0589 172.954 26.8755 172.171 26.8755C171.404 26.8755 170.696 27.0589 170.046 27.4255C169.396 27.7922 168.862 28.3005 168.446 28.9505C168.046 29.6005 167.812 30.3505 167.746 31.2005Z"
                fill="#1F171E"
              />
              <g clipPath="url(#clip1_258_14356)">
                <rect
                  x="0.25"
                  width="13.75"
                  height="40"
                  rx="2.5"
                  fill="#FF3333"
                />
                <path
                  d="M2.12498 5.125H12.125"
                  stroke="#FCDDC9"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M2.12498 7.625H12.125"
                  stroke="#FCDDC9"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M2.12498 10.125H12.125"
                  stroke="#FCDDC9"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </g>
              <g clipPath="url(#clip2_258_14356)">
                <rect
                  x="14"
                  y="6.87402"
                  width="13.75"
                  height="34.8263"
                  rx="2.5"
                  transform="rotate(-18 14 6.87402)"
                  fill="#FF3333"
                />
                <g clipPath="url(#clip3_258_14356)">
                  <path
                    d="M17.3667 11.168L26.8773 8.0778"
                    stroke="#FCDDC9"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.1393 13.5454L27.6498 10.4552"
                    stroke="#FCDDC9"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.9118 15.9233L28.4224 12.8332"
                    stroke="#FCDDC9"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_258_14356">
                <rect
                  width="178"
                  height="40"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip1_258_14356">
                <rect
                  x="0.25"
                  width="13.75"
                  height="40"
                  rx="2.5"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip2_258_14356">
                <rect
                  width="13.75"
                  height="34.8263"
                  fill="white"
                  transform="translate(14 6.87402) rotate(-18)"
                />
              </clipPath>
              <clipPath id="clip3_258_14356">
                <rect
                  x="15.4053"
                  y="9.17676"
                  width="12.5"
                  height="10"
                  rx="0.445343"
                  transform="rotate(-18 15.4053 9.17676)"
                  fill="white"
                />
              </clipPath>
            </defs>
          </symbol>
          <symbol id="logo_black" viewBox="0 0 218 41" fill="none">
            <g clip-path="url(#clip0_199_9190)">
              <path
                d="M64.3624 31.757C64.3624 33.357 63.9491 34.7036 63.1224 35.797C62.2958 36.8636 61.1758 37.677 59.7624 38.237C58.3758 38.797 56.8558 39.077 55.2024 39.077H41.4824V10.677H56.6824C58.0158 10.677 59.1624 11.037 60.1224 11.757C61.1091 12.4503 61.8558 13.357 62.3624 14.477C62.8958 15.5703 63.1624 16.717 63.1624 17.917C63.1624 19.277 62.8158 20.5703 62.1224 21.797C61.4291 23.0236 60.4158 23.9303 59.0824 24.517C60.7091 24.997 61.9891 25.8636 62.9224 27.117C63.8824 28.3703 64.3624 29.917 64.3624 31.757ZM58.8024 30.717C58.8024 29.997 58.6558 29.357 58.3624 28.797C58.0691 28.2103 57.6691 27.757 57.1624 27.437C56.6824 27.0903 56.1224 26.917 55.4824 26.917H47.0024V34.397H55.2024C55.8691 34.397 56.4691 34.237 57.0024 33.917C57.5624 33.5703 58.0024 33.117 58.3224 32.557C58.6424 31.997 58.8024 31.3836 58.8024 30.717ZM47.0024 15.397V22.557H54.3624C54.9758 22.557 55.5358 22.4103 56.0424 22.117C56.5491 21.8236 56.9491 21.4103 57.2424 20.877C57.5624 20.3436 57.7224 19.7036 57.7224 18.957C57.7224 18.237 57.5758 17.6103 57.2824 17.077C57.0158 16.5436 56.6424 16.1303 56.1624 15.837C55.7091 15.5436 55.1891 15.397 54.6024 15.397H47.0024Z"
                fill="#1F171E"
              />
              <path
                d="M77.8299 39.477C76.1233 39.477 74.5899 39.197 73.2299 38.637C71.8699 38.0503 70.7099 37.2503 69.7499 36.237C68.8166 35.2236 68.0966 34.0636 67.5899 32.757C67.0833 31.4503 66.8299 30.077 66.8299 28.637C66.8299 27.1703 67.0833 25.7836 67.5899 24.477C68.0966 23.1703 68.8166 22.0103 69.7499 20.997C70.7099 19.9836 71.8699 19.197 73.2299 18.637C74.5899 18.0503 76.1233 17.757 77.8299 17.757C79.5366 17.757 81.0566 18.0503 82.3899 18.637C83.7499 19.197 84.9099 19.9836 85.8699 20.997C86.8299 22.0103 87.5499 23.1703 88.0299 24.477C88.5366 25.7836 88.7899 27.1703 88.7899 28.637C88.7899 30.077 88.5366 31.4503 88.0299 32.757C87.5499 34.0636 86.8299 35.2236 85.8699 36.237C84.9366 37.2503 83.7899 38.0503 82.4299 38.637C81.0699 39.197 79.5366 39.477 77.8299 39.477ZM72.3499 28.637C72.3499 29.8636 72.5899 30.957 73.0699 31.917C73.5499 32.8503 74.2033 33.5836 75.0299 34.117C75.8566 34.6503 76.7899 34.917 77.8299 34.917C78.8433 34.917 79.7633 34.6503 80.5899 34.117C81.4166 33.557 82.0699 32.8103 82.5499 31.877C83.0566 30.917 83.3099 29.8236 83.3099 28.597C83.3099 27.397 83.0566 26.317 82.5499 25.357C82.0699 24.397 81.4166 23.6503 80.5899 23.117C79.7633 22.5836 78.8433 22.317 77.8299 22.317C76.7899 22.317 75.8566 22.597 75.0299 23.157C74.2033 23.6903 73.5499 24.437 73.0699 25.397C72.5899 26.3303 72.3499 27.4103 72.3499 28.637Z"
                fill="#1F171E"
              />
              <path
                d="M102.088 39.477C100.381 39.477 98.8477 39.197 97.4877 38.637C96.1277 38.0503 94.9677 37.2503 94.0077 36.237C93.0744 35.2236 92.3544 34.0636 91.8477 32.757C91.3411 31.4503 91.0877 30.077 91.0877 28.637C91.0877 27.1703 91.3411 25.7836 91.8477 24.477C92.3544 23.1703 93.0744 22.0103 94.0077 20.997C94.9677 19.9836 96.1277 19.197 97.4877 18.637C98.8477 18.0503 100.381 17.757 102.088 17.757C103.794 17.757 105.314 18.0503 106.648 18.637C108.008 19.197 109.168 19.9836 110.128 20.997C111.088 22.0103 111.808 23.1703 112.288 24.477C112.794 25.7836 113.048 27.1703 113.048 28.637C113.048 30.077 112.794 31.4503 112.288 32.757C111.808 34.0636 111.088 35.2236 110.128 36.237C109.194 37.2503 108.048 38.0503 106.688 38.637C105.328 39.197 103.794 39.477 102.088 39.477ZM96.6077 28.637C96.6077 29.8636 96.8477 30.957 97.3277 31.917C97.8077 32.8503 98.4611 33.5836 99.2877 34.117C100.114 34.6503 101.048 34.917 102.088 34.917C103.101 34.917 104.021 34.6503 104.848 34.117C105.674 33.557 106.328 32.8103 106.808 31.877C107.314 30.917 107.568 29.8236 107.568 28.597C107.568 27.397 107.314 26.317 106.808 25.357C106.328 24.397 105.674 23.6503 104.848 23.117C104.021 22.5836 103.101 22.317 102.088 22.317C101.048 22.317 100.114 22.597 99.2877 23.157C98.4611 23.6903 97.8077 24.437 97.3277 25.397C96.8477 26.3303 96.6077 27.4103 96.6077 28.637Z"
                fill="#1F171E"
              />
              <path
                d="M130.986 39.077L124.866 30.037L122.026 32.837V39.077H116.666V9.87695H122.026V27.557L130.466 18.157H136.146L128.346 27.037L136.706 39.077H130.986Z"
                fill="#1F171E"
              />
              <path
                d="M162.7 39.0005H160.5V31.7005C160.5 30.3339 160.275 29.3255 159.825 28.6755C159.392 28.0255 158.742 27.7005 157.875 27.7005C156.992 27.7005 156.192 28.0255 155.475 28.6755C154.758 29.3089 154.25 30.1339 153.95 31.1505V39.0005H151.75V31.7005C151.75 30.3172 151.533 29.3089 151.1 28.6755C150.667 28.0255 150.017 27.7005 149.15 27.7005C148.283 27.7005 147.483 28.0172 146.75 28.6505C146.033 29.2672 145.525 30.0922 145.225 31.1255V39.0005H143.025V25.9505H145.025V28.7505C145.558 27.7839 146.25 27.0422 147.1 26.5255C147.95 25.9922 148.908 25.7255 149.975 25.7255C151.058 25.7255 151.925 26.0255 152.575 26.6255C153.225 27.2089 153.625 27.9672 153.775 28.9005C154.358 27.8672 155.067 27.0839 155.9 26.5505C156.733 26.0005 157.683 25.7255 158.75 25.7255C159.5 25.7255 160.125 25.8672 160.625 26.1505C161.142 26.4172 161.55 26.8005 161.85 27.3005C162.15 27.7839 162.367 28.3589 162.5 29.0255C162.633 29.6922 162.7 30.4172 162.7 31.2005V39.0005Z"
                fill="#1F171E"
              />
              <path
                d="M171.896 39.2505C170.912 39.2505 170.012 39.0755 169.196 38.7255C168.396 38.3589 167.696 37.8672 167.096 37.2505C166.512 36.6172 166.054 35.8922 165.721 35.0755C165.404 34.2589 165.246 33.3922 165.246 32.4755C165.246 31.2422 165.529 30.1172 166.096 29.1005C166.662 28.0839 167.446 27.2672 168.446 26.6505C169.462 26.0339 170.621 25.7255 171.921 25.7255C173.237 25.7255 174.379 26.0422 175.346 26.6755C176.329 27.2922 177.087 28.1089 177.621 29.1255C178.171 30.1255 178.446 31.2089 178.446 32.3755C178.446 32.5422 178.437 32.7089 178.421 32.8755C178.421 33.0255 178.412 33.1422 178.396 33.2255H167.571C167.637 34.0755 167.871 34.8339 168.271 35.5005C168.687 36.1505 169.221 36.6672 169.871 37.0505C170.521 37.4172 171.221 37.6005 171.971 37.6005C172.771 37.6005 173.521 37.4005 174.221 37.0005C174.937 36.6005 175.429 36.0755 175.696 35.4255L177.596 35.9505C177.312 36.5839 176.887 37.1505 176.321 37.6505C175.771 38.1505 175.112 38.5422 174.346 38.8255C173.596 39.1089 172.779 39.2505 171.896 39.2505ZM167.496 31.7005H176.396C176.329 30.8505 176.087 30.1005 175.671 29.4505C175.254 28.8005 174.721 28.2922 174.071 27.9255C173.421 27.5589 172.704 27.3755 171.921 27.3755C171.154 27.3755 170.446 27.5589 169.796 27.9255C169.146 28.2922 168.612 28.8005 168.196 29.4505C167.796 30.1005 167.562 30.8505 167.496 31.7005Z"
                fill="#1F171E"
              />
              <g clip-path="url(#clip1_199_9190)">
                <rect
                  y="0.5"
                  width="13.75"
                  height="40"
                  rx="2.5"
                  fill="#FF3333"
                />
                <path
                  d="M1.875 5.625H11.875"
                  stroke="#1F171E"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
                <path
                  d="M1.875 8.125H11.875"
                  stroke="#1F171E"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
                <path
                  d="M1.875 10.625H11.875"
                  stroke="#1F171E"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
              </g>
              <g clip-path="url(#clip2_199_9190)">
                <rect
                  x="13.75"
                  y="7.37402"
                  width="13.75"
                  height="34.8263"
                  rx="2.5"
                  transform="rotate(-18 13.75 7.37402)"
                  fill="#FF3333"
                />
                <g clip-path="url(#clip3_199_9190)">
                  <path
                    d="M17.1167 11.6685L26.6273 8.57829"
                    stroke="#1F171E"
                    stroke-width="1.25"
                    stroke-linecap="round"
                  />
                  <path
                    d="M17.8892 14.0454L27.3997 10.9552"
                    stroke="#1F171E"
                    stroke-width="1.25"
                    stroke-linecap="round"
                  />
                  <path
                    d="M18.6617 16.4233L28.1723 13.3332"
                    stroke="#1F171E"
                    stroke-width="1.25"
                    stroke-linecap="round"
                  />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_199_9190">
                <rect
                  width="217.5"
                  height="40"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
              <clipPath id="clip1_199_9190">
                <rect y="0.5" width="13.75" height="40" rx="2.5" fill="white" />
              </clipPath>
              <clipPath id="clip2_199_9190">
                <rect
                  width="13.75"
                  height="34.8263"
                  fill="white"
                  transform="translate(13.75 7.37402) rotate(-18)"
                />
              </clipPath>
              <clipPath id="clip3_199_9190">
                <rect
                  x="15.1553"
                  y="9.67676"
                  width="12.5"
                  height="10"
                  rx="0.445343"
                  transform="rotate(-18 15.1553 9.67676)"
                  fill="white"
                />
              </clipPath>
            </defs>
          </symbol>
          <symbol id="instagram" viewBox="0 0 21 21" fill="none">
            <path
              d="M10.4425 2.48439C13.0928 2.52622 13.4542 2.53193 14.5384 2.54905C15.5021 2.56426 15.9802 2.8128 16.3397 2.93897C16.8178 3.18752 17.1773 3.31369 17.533 3.68079C17.8886 4.0479 18.1239 4.41311 18.2367 4.89688C18.3515 5.26018 18.4644 5.74395 18.5696 6.70958C18.5525 7.79379 18.5487 8.03472 18.5049 10.8055C18.4612 13.5762 18.4574 13.8171 18.4403 14.9013C18.4251 15.8651 18.1765 16.3431 18.0504 16.7026C17.8018 17.1807 17.6756 17.5402 17.3085 17.8959C16.9414 18.2516 16.5762 18.4868 16.0925 18.5997C15.7292 18.7144 15.2454 18.8273 14.2797 18.9325C13.1955 18.9154 12.9546 18.9116 10.1839 18.8679C7.41313 18.8241 7.1722 18.8203 6.088 18.8032C5.12426 18.788 4.6462 18.5395 4.2867 18.4133C3.80863 18.1648 3.44914 18.0386 3.09344 17.6715C2.73774 17.3044 2.50252 16.9392 2.38966 16.4554C2.27489 16.0921 2.16203 15.6083 2.05678 14.6427C2.0739 13.5585 2.0777 13.3176 2.12144 10.5468C2.16519 7.77607 2.16899 7.53514 2.18611 6.45094C2.20132 5.4872 2.44986 5.00914 2.57603 4.64964C2.82457 4.17158 2.95075 3.81208 3.31785 3.45638C3.68496 3.10069 4.05016 2.86546 4.53393 2.7526C4.89724 2.63784 5.38101 2.52498 6.34664 2.41972C7.43085 2.43684 7.79225 2.44255 10.4425 2.48439ZM10.471 0.677381C7.70031 0.63364 7.45937 0.629836 6.37517 0.61272C5.29097 0.595604 4.56436 0.825127 3.95822 1.05655C3.35209 1.28798 2.74405 1.63987 2.1322 2.23269C1.52036 2.82552 1.27182 3.30358 0.899006 4.02068C0.648563 4.61921 0.516685 5.34011 0.379101 6.42241C0.361985 7.50661 0.35628 7.86801 0.31444 10.5183C0.270698 13.289 0.266895 13.53 0.249779 14.6142C0.232662 15.6984 0.462186 16.425 0.693611 17.0311C0.925036 17.6372 1.27693 18.2453 1.86975 18.8571C2.46258 19.469 2.94064 19.7175 3.65774 20.0903C4.25627 20.3408 4.97717 20.4726 6.05947 20.6102C7.14367 20.6273 7.50507 20.633 10.1553 20.6749C12.8056 20.7167 13.167 20.7224 14.2512 20.7396C15.3354 20.7567 16.062 20.5271 16.6682 20.2957C17.2743 20.0643 17.8823 19.7124 18.4942 19.1196C19.106 18.5268 19.3546 18.0487 19.7274 17.3316C19.9778 16.7331 20.1097 16.0122 20.2473 14.9299C20.2644 13.8457 20.2701 13.4843 20.3119 10.834C20.3538 8.18371 20.3595 7.82231 20.3766 6.73811C20.3937 5.65391 20.1642 4.9273 19.9328 4.32117C19.7014 3.71503 19.3495 3.10699 18.7566 2.49514C18.1638 1.8833 17.6857 1.63476 16.9687 1.26195C16.3701 1.0115 15.6492 0.879626 14.5669 0.742043C13.4827 0.724927 13.2418 0.721123 10.471 0.677381Z"
              fill="white"
            />
            <path
              d="M10.395 5.49606C7.50377 5.45042 5.17876 7.70315 5.13312 10.5944C5.08747 13.4856 7.34021 15.8106 10.2314 15.8562C13.1226 15.9019 15.4476 13.6491 15.4933 10.7579C15.5389 7.86671 13.2862 5.5417 10.395 5.49606ZM10.2599 14.0492C8.45294 14.0207 6.90969 12.5504 6.94012 10.6229C6.96865 8.81588 8.43897 7.27263 10.3664 7.30306C12.1734 7.33159 13.7167 8.80192 13.6863 10.7294C13.6577 12.5364 12.0669 14.0777 10.2599 14.0492Z"
              fill="white"
            />
            <path
              d="M15.6784 6.66394C16.3437 6.67444 16.8916 6.14361 16.9021 5.47829C16.9126 4.81297 16.3818 4.26511 15.7164 4.2546C15.0511 4.2441 14.5033 4.77493 14.4927 5.44025C14.4822 6.10557 15.0131 6.65344 15.6784 6.66394Z"
              fill="white"
            />
          </symbol>
          <symbol id="telegram" viewBox="0 0 20 18" fill="none">
            <path
              d="M19.4209 1.41574L16.1682 17.0564C16.1682 17.0564 15.7306 18.1375 14.5838 17.5976L7.73724 11.983L7.70535 11.9662C8.65565 11.1102 16.0248 4.46295 16.347 4.16145C16.8459 3.69451 16.5453 3.4071 15.9692 3.75668L5.1303 10.6421L1.01443 9.13469C1.01443 9.13469 0.366916 8.8845 0.312495 8.36186C0.257262 7.83835 1.0606 7.56836 1.0606 7.56836L18.0408 0.980619C18.0408 0.980619 19.4374 0.371572 19.4209 1.41574Z"
              fill="#FEFEFE"
            />
          </symbol>
          <symbol id="search" viewBox="0 0 24 25" fill="none">
            <circle
              cx="11.5"
              cy="12"
              r="9.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M18.5 19L22 22.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </symbol>
        </defs>
      </svg>
    </div>
  );
};

export default Icons;
