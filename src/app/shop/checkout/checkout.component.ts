import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/interfaces/cart-items.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  checkOutItems: CartItem[] = [];
  orderDetails: any[] = [];
  amount: number;
  totalAmount: number;
  shippingAmount: number = 40;

  handler: any = null;

  constructor(public _productService: ProductService, private _dataService: HttpService, private _formBuilder: FormBuilder,
    private _toastrService: ToastrService, private _cartService: CartService, private _orderService: OrdersService) { }

  createRegForm() {
    this.checkoutForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      amount: [0]
    });
  }

  ngOnInit(): void {
    this.loadStripe();
    this.createRegForm();
    this._cartService.getItems().subscribe(res => {
      this.checkOutItems = res;
    });

    this.getTotal().subscribe(res => {
      this.amount = res;
      this.totalAmount = res + this.shippingAmount;
    });

  }

  getTotal(): Observable<number> {
    return this._cartService.getTotalAmount();
  }

  onSubmit(formData: any) {
    if (this.checkoutForm.invalid) {
      return;
    }

    let allItems = [];
    for (let i = 0; i < this.checkOutItems.length; i++) {
      console.log(this.checkOutItems[i]);
      allItems[i] = {
        ProductId: this.checkOutItems[i].product.id,
        Quantity: this.checkOutItems[i].quantity,
        Size: this.checkOutItems[i].product.size,
        Color: this.checkOutItems[i].product.colors,
        Price: this.checkOutItems[i].product.price,
        Discount: this.checkOutItems[i].product.discount
      }
    }

    let obj = {
      id: 0,
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      phone: formData.value.phone,
      email: formData.value.email,
      address: formData.value.address,
      country: formData.value.country,
      town: formData.value.town,
      state: formData.value.state,
      postalcode: formData.value.postalcode,
      amount: this.amount,
      shippingAmount: 40,
      paymentTypeId: 1,
      items: allItems,
      payment: null
    }


    let saveData = (obj) =>
      this._dataService.post(environment.BASE_API_PATH + "PaymentMaster/Save/", obj).subscribe(objdata => {
        if (objdata.isSuccess) {
          this._toastrService.success("Payment done successfully!", "Payment Master");
          let orderDts = {
            product: this.checkOutItems,
            shippingDetails: obj,
            orderId: objdata.data.orderId,
            totalAmount: this.totalAmount,
            expectedDate: objdata.data.expecteddate,
            paymentDate: objdata.data.paymentDate
          }
          this._orderService.setOrderDetails(orderDts);
          this.checkoutForm.reset();
        } else {
          this._toastrService.error(objdata.errors[0], "Payment Master");
        }
      });


    // For Payment here
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE',
      locale: 'auto',
      token: function (token: any) {
        let objPayment = { tokenId: token.id, amount: obj.amount + obj.shippingAmount, description: "Thank you for shopping with Dino mall" };
        obj.payment = objPayment;
        saveData(obj);
      }
    });

    handler.open({
      name: 'Dino Mall',
      description: 'E-Commerce',
      country: 'INDIA',
      currency: 'INR',
      amount: this.totalAmount * 100
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE', // Change it
          locale: 'auto',
          token: function () {

          }
        });
      }
      window.document.body.appendChild(s);
    }
  }
}