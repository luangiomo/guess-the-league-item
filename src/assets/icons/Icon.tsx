interface Props {
  size: number;
}
function Icon({ size }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.63179 0.751659C7.57169 0.833392 7.5108 0.916193 7.44849 1.00016C8.4149 2.19007 9.36909 3.36492 10.3336 4.55294C10.9108 3.84129 11.4788 3.14129 12.0436 2.44509C12.4352 1.96249 12.8253 1.48172 13.2159 1.00016C13.1543 0.916744 13.0936 0.834052 13.0335 0.752074C12.8661 0.52378 12.7027 0.301023 12.5328 0.0836145C12.4942 0.0342115 12.402 0.00315813 12.3347 0.00315813C11.0032 -0.00154692 9.67115 -0.00201742 8.33962 0.00362864C8.2667 0.00409914 8.16836 0.0426806 8.12507 0.0972592C7.95757 0.308626 7.79767 0.526077 7.63179 0.751659ZM17.0045 5.5107C18.0161 5.0002 18.8921 4.28409 19.7306 3.45365L19.7296 3.45318C19.705 3.45048 19.6855 3.44802 19.6693 3.44598C19.6403 3.44233 19.6219 3.44001 19.6035 3.44001L18.8612 3.43978C17.2114 3.43921 15.5615 3.43864 13.9118 3.44518C13.8187 3.44565 13.7043 3.50776 13.6356 3.57692C13.4092 3.80529 13.1858 4.03656 12.9624 4.26782C12.7011 4.53828 12.4398 4.80874 12.1738 5.07454C12.0604 5.18793 12.0519 5.28909 12.0891 5.42648C12.239 5.98055 12.3874 6.53495 12.5358 7.08929L12.5359 7.0897C12.6376 7.46963 12.7393 7.84953 12.8414 8.22928C12.9002 8.44774 12.9611 8.66557 13.0231 8.88739L13.0233 8.88822C13.0541 8.99817 13.0851 9.1091 13.1162 9.22157C13.81 8.89058 14.4873 8.5672 15.1655 8.24342L15.1677 8.24238L15.1712 8.24069L15.8997 7.89287L14.1904 5.78171C14.3622 5.78171 14.5286 5.78488 14.6909 5.78798H14.6909C15.0516 5.79486 15.3925 5.80136 15.7303 5.77183L15.78 5.76752C16.1974 5.73134 16.6443 5.69261 17.0045 5.5107ZM9.81583 15.5812L9.81584 15.5813L9.81585 15.5813C9.98753 15.7211 10.1599 15.8614 10.3352 15.9999H10.3357C10.5246 15.8507 10.7121 15.7014 10.8992 15.5526L10.9006 15.5514L10.901 15.5511L10.9011 15.551L10.9013 15.5509C11.3924 15.1601 11.8796 14.7723 12.3763 14.3969C12.5522 14.2632 12.572 14.1353 12.5348 13.9442C12.2096 12.2773 11.8872 10.6096 11.5647 8.94183L11.5646 8.94142L11.5646 8.94101L11.2725 7.43056C11.1745 6.92342 11.0755 6.41629 10.9806 5.93055L10.8895 5.46338C10.832 5.49523 10.7749 5.53451 10.7181 5.57356C10.5904 5.66143 10.4644 5.74811 10.3399 5.74615C10.2063 5.74385 10.0741 5.65569 9.94371 5.56877C9.88769 5.53142 9.83202 5.4943 9.77672 5.46432C9.64545 6.14582 9.51484 6.83003 9.38389 7.51609L9.38373 7.51691L9.38361 7.51757L9.38359 7.51768C8.99975 9.52855 8.61287 11.5553 8.19724 13.5763C8.09326 14.083 8.1883 14.363 8.6047 14.6486C9.02292 14.9356 9.41748 15.2569 9.81583 15.5812ZM7.53982 9.2156L7.53962 9.2155C7.54777 9.19779 7.55564 9.18219 7.56287 9.16788L7.5629 9.16783C7.57685 9.14021 7.58839 9.11735 7.59487 9.09327L7.70651 8.67757C8.00116 7.58065 8.29579 6.48376 8.58152 5.38428C8.60317 5.301 8.56459 5.16738 8.50436 5.10339C8.02209 4.58865 7.5323 4.08098 7.03309 3.58224C6.9564 3.50508 6.82089 3.44721 6.71221 3.44674C5.01572 3.43944 3.31923 3.44037 1.62275 3.4413L1.13813 3.44156C1.10094 3.44156 1.06375 3.44613 1.01857 3.45168L1.01856 3.45168C0.995715 3.45448 0.970831 3.45754 0.942871 3.46038C1.70932 4.21037 2.50213 4.87378 3.41491 5.37252C3.73014 5.54519 4.09008 5.68399 4.44343 5.72822C4.82559 5.7764 5.21362 5.77718 5.60172 5.77795C5.7631 5.77827 5.9245 5.77859 6.08549 5.78233C6.1583 5.78383 6.2311 5.78341 6.31756 5.78291C6.36632 5.78263 6.41942 5.78233 6.47931 5.78233C5.88929 6.5102 5.33504 7.19431 4.76855 7.89395L7.53962 9.2155L7.53935 9.21607L7.53982 9.2156Z"
        fill="white"
      />
    </svg>
  );
}

export default Icon;