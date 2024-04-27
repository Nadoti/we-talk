import { toast } from "sonner";


type NotificationTypeProps = "success" | "error" | "loading"


export function notification(type: NotificationTypeProps, message: string) {


  if(type === "success"){
    toast.success(message, {
      duration: 3000,
      invert: true,
    });

  }
  if(type === "error"){
    toast.error(message, {
      duration: 3000,
      invert: true,
    });

  }

  if(type === "loading"){
    toast.loading(message, {
      action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
      },
      invert: true,
    });
  }



}