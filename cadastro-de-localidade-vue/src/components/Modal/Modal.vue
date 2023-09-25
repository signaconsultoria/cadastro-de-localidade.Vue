<template>
    <div class="modal-global">
      <div class="modal-global__content">
        <slot />
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .modal-global {
    background: rgba(0, 0, 0, 0.5);
  
    width: 100%;
  
    height: 100%;
  
    position: fixed;
  
    left: 0;
  
    top: 0;
  
    display: flex;
  
    align-items: center;
  
    justify-content: center;
  
    &__content {
      width: 70%;
  
      border-radius: 5px;
  
      height: 40%;
  
      background: white;
    }
  }
  </style>
  