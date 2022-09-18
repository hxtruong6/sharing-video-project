/* eslint-disable import/prefer-default-export */
const selectPublicProds = [
	'id',
	'sku',
	'title',
	'is_featured',
	'is_hot',
	'is_sale',
	'price',
	'sale_price',
	'discount',
	'slug',
	'thumbnail',
	'description',
	'warranty',
	'images',
	'inventory',
	'is_out_of_stock',
	// 'variants',
	'content',
	'brand_id',
	'tag_ids',
	'priority'
];

const selectPublicMenu = ['id', 'name', 'url'];

export { selectPublicProds, selectPublicMenu };
