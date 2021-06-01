import {
	INodeProperties,
} from 'n8n-workflow';

import {
	billingAddress,
	makeGetAllFields,
	makeProductDetails,
	shippingAddress,
} from './SharedFields';

export const purchaseOrderOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
			},
			{
				name: 'Delete',
				value: 'delete',
			},
			{
				name: 'Get',
				value: 'get',
			},
			{
				name: 'Get All',
				value: 'getAll',
			},
			{
				name: 'Update',
				value: 'update',
			},
			{
				name: 'Upsert',
				value: 'upsert',
			},
		],
		default: 'create',
		description: 'Operation to perform',
	},
] as INodeProperties[];

export const purchaseOrderFields = [
	// ----------------------------------------
	//      purchaseOrder: create + upsert
	// ----------------------------------------
	{
		displayName: 'Subject',
		name: 'subject',
		description: 'Subject or title of the purchase order.',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'create',
					'upsert',
				],
			},
		},
	},
	{
		displayName: 'Vendor ID',
		name: 'vendorId',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getVendors',
		},
		description: 'ID of the vendor associated with the purchase order.',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'create',
					'upsert',
				],
			},
		},
	},
	makeProductDetails('purchaseOrder', 'create', { hasUpsert: true }),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Adjustment',
				name: 'Adjustment',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Adjustment in the grand total, if any.',
			},
			{
				displayName: 'Billing Address',
				name: 'Billing_Address',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Billing Address Field',
				options: [
					{
						displayName: 'Billing Address Fields',
						name: 'billing_address_fields',
						values: [
							{
								displayName: 'Billing City',
								name: 'Billing_City',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Billing Code',
								name: 'Billing_Code',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Billing Country',
								name: 'Billing_Country',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Billing State',
								name: 'Billing_State',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Billing Street',
								name: 'Billing_Street',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Carrier',
				name: 'Carrier',
				type: 'string',
				default: '',
				description: 'Name of the carrier.',
			},
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: '',
				description: 'Symbol of the currency in which revenue is generated.',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Discount',
				name: 'Discount',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Due Date',
				name: 'Due_Date',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Exchange Rate',
				name: 'Exchange_Rate',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Exchange rate of the default currency to the home currency.',
			},
			{
				displayName: 'Grand Total',
				name: 'Grand_Total',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Total amount for the product after deducting tax and discounts.',
			},
			{
				displayName: 'PO Date',
				name: 'PO_Date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the purchase order was issued.',
			},
			{
				displayName: 'PO Number',
				name: 'PO_Number',
				type: 'string',
				default: '',
				description: 'ID of the purchase order after creating a case.',
			},
			{
				displayName: 'Sales Commission',
				name: 'Sales_Commission',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Commission of sales person on deal closure.',
			},
			shippingAddress,
			{
				displayName: 'Status',
				name: 'Status',
				type: 'string',
				default: '',
				description: 'Status of the purchase order.',
			},
			{
				displayName: 'Sub Total',
				name: 'Sub_Total',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Total amount for the product excluding tax.',
			},
			{
				displayName: 'Tax',
				name: 'Tax',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Tax amount as the sum of sales tax and value-added tax.',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'Terms_and_Conditions',
				type: 'string',
				default: '',
				description: 'Terms and conditions associated with the purchase order.',
			},
			{
				displayName: 'Tracking Number',
				name: 'Tracking_Number',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------------
	//          purchaseOrder: delete
	// ----------------------------------------
	{
		displayName: 'Purchase Order ID',
		name: 'purchaseOrderId',
		description: 'ID of the purchase order to delete.',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'delete',
				],
			},
		},
	},

	// ----------------------------------------
	//            purchaseOrder: get
	// ----------------------------------------
	{
		displayName: 'Purchase Order ID',
		name: 'purchaseOrderId',
		description: 'ID of the purchase order to retrieve.',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------------
	//          purchaseOrder: getAll
	// ----------------------------------------
	...makeGetAllFields('purchaseOrder'),

	// ----------------------------------------
	//          purchaseOrder: update
	// ----------------------------------------
	{
		displayName: 'Purchase Order ID',
		name: 'purchaseOrderId',
		description: 'ID of the purchase order to update.',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'update',
				],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'purchaseOrder',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Adjustment',
				name: 'Adjustment',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Adjustment in the grand total, if any.',
			},
			billingAddress,
			{
				displayName: 'Carrier',
				name: 'Carrier',
				type: 'string',
				default: '',
				description: 'Name of the carrier.',
			},
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: '',
				description: 'Symbol of the currency in which revenue is generated.',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Discount',
				name: 'Discount',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Due Date',
				name: 'Due_Date',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Exchange Rate',
				name: 'Exchange_Rate',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Exchange rate of the default currency to the home currency.',
			},
			{
				displayName: 'Grand Total',
				name: 'Grand_Total',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Total amount for the product after deducting tax and discounts.',
			},
			{
				displayName: 'PO Date',
				name: 'PO_Date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the purchase order was issued.',
			},
			{
				displayName: 'PO Number',
				name: 'PO_Number',
				type: 'string',
				default: '',
				description: 'ID of the purchase order after creating a case.',
			},
			// productDetails('purchaseOrder', 'update'),
			{
				displayName: 'Sales Commission',
				name: 'Sales_Commission',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Commission of sales person on deal closure.',
			},
			shippingAddress,
			{
				displayName: 'Status',
				name: 'Status',
				type: 'string',
				default: '',
				description: 'Status of the purchase order.',
			},
			{
				displayName: 'Sub Total',
				name: 'Sub_Total',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Total amount for the product excluding tax.',
			},
			{
				displayName: 'Subject',
				name: 'Subject',
				type: 'string',
				default: '',
				description: 'Subject or title of the purchase order.',
			},
			{
				displayName: 'Tax',
				name: 'Tax',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Tax amount as the sum of sales tax and value-added tax.',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'Terms_and_Conditions',
				type: 'string',
				default: '',
				description: 'Terms and conditions associated with the purchase order.',
			},
			{
				displayName: 'Tracking Number',
				name: 'Tracking_Number',
				type: 'string',
				default: '',
			},
		],
	},
] as INodeProperties[];