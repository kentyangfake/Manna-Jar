import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: '#e7e5e4',
  });

export const ThemeSwal = Swal.mixin({
    confirmButtonColor: '#d6d3d1',
    background: '#e7e5e4',
  });

export const InfoSwal = Swal.mixin({
  icon: 'info',
  confirmButtonColor: '#d6d3d1',
  background: '#f5f5f4',
});

export const ErrorSwal = Swal.mixin({
  icon: 'error',
  confirmButtonColor: '#d6d3d1',
  background: '#f5f5f4',
});

export const SuccessSwal = Swal.mixin({
  icon: 'success',
  confirmButtonColor: '#d6d3d1',
  background: '#f5f5f4',
});

export const WarningSwal = Swal.mixin({
  icon: 'warning',
  background: '#f5f5f4',
  showCancelButton: true,
  confirmButtonColor: '#d6d3d1',
  cancelButtonColor: '#d6d3d1',
});

export const QuestionSwal = Swal.mixin({
  icon: 'question',
  confirmButtonColor: '#d6d3d1',
  background: '#f5f5f4',
});

export const HelperSwal = Swal.mixin({
  showConfirmButton: false,
  background: 'rgba(255,255,255,0)',
});