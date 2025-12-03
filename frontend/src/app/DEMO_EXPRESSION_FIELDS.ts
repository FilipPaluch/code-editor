import type { ExpressionField } from "./expression-fields/expressionField";

export const DEMO_EXPRESSION_FIELDS: ExpressionField[] = [

  {
    uniqueId: "order.orderNumber",
    options: [],
    properties: [],
    canHaveFiles: false,
    isWritable: true
  },
  {
    uniqueId: "order.customerName",
    options: [],
    properties: [],
    canHaveFiles: false,
    isWritable: true
  },
  {
    uniqueId: "order.customerEmail",
    options: [],
    properties: [],
    canHaveFiles: false,
    isWritable: true
  },

  {
    uniqueId: "order.status",
    options: [
      { value: "Draft",     globalId: "order-status-draft" },
      { value: "Paid",      globalId: "order-status-paid" },
      { value: "Shipped",   globalId: "order-status-shipped" },
      { value: "Delivered", globalId: "order-status-delivered" },
      { value: "Cancelled", globalId: "order-status-cancelled" }
    ],
    properties: [],
    canHaveFiles: false,
    isWritable: true
  },
  {
    uniqueId: "order.deliveryMethod",
    options: [
      { value: "Standard", globalId: "delivery-standard" },
      { value: "Express",  globalId: "delivery-express" },
      { value: "Pickup",   globalId: "delivery-pickup" }
    ],
    properties: [],
    canHaveFiles: false,
    isWritable: true
  },
  {
    uniqueId: "order.items",
    options: [],
    properties: [
      { name: "item.productName", options: [] }, 
      { name: "item.quantity",     options: [] }, 
      { name: "item.unitPrice",    options: [] },  
      {
        name: "item.category",                    
        options: [
          { value: "Books",        globalId: "item-category-books" },
          { value: "Electronics",  globalId: "item-category-electronics" },
          { value: "Clothing",     globalId: "item-category-clothing" },
          { value: "Other",        globalId: "item-category-other" }
        ]
      }
    ],
    canHaveFiles: false,
    isWritable: true
  },
  {
    uniqueId: "order.attachments",
    options: [],
    properties: [
      { name: "file.fileName",    options: [] },
      { name: "file.description", options: [] }
    ],
    canHaveFiles: true,
    isWritable: true
  },
  {
    uniqueId: "profile.fullName",
    options: [],
    properties: [],
    canHaveFiles: false,
    isWritable: false
  },
  {
    uniqueId: "profile.email",
    options: [],
    properties: [],
    canHaveFiles: false,
    isWritable: false
  },
  {
    uniqueId: "profile.language",
    options: [
      { value: "English",  globalId: "lang-en" },
      { value: "Polish",   globalId: "lang-pl" },
      { value: "German",   globalId: "lang-de" }
    ],
    properties: [],
    canHaveFiles: false,
    isWritable: false
  },
  {
    uniqueId: "profile.devices",
    options: [],
    properties: [
      { name: "device.type",     options: [] }, 
      { name: "device.os",       
        options: [
            { value: "Windows",  globalId: "os-windows" },
            { value: "macOS",    globalId: "os-macos" },
            { value: "Linux",    globalId: "os-linux" },
            { value: "Android",  globalId: "os-android" },
            { value: "iOS",      globalId: "os-ios" }
          ]
       }, 
      { name: "device.lastSeen", options: [] } 
    ],
    canHaveFiles: false,
    isWritable: false
  }
];

