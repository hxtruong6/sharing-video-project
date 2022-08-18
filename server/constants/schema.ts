const Tables = {
	role: 'role',
	user: 'user',
	userLog: 'user_log',

	menu: 'menu',
	category: 'category',

	brand: 'brand',
	collection: 'collection',

	product: 'product',
	productCategory: 'product_category',

	specType: 'spec_type',
	specName: 'spec_name',
	specValue: 'spec_value',

	news: 'news',

	order: 'order',
	orderItem: 'order_item',

	generalInfo: 'general_info',
	banner: 'banner',
	image: 'image',
	tag: 'tag',
};

const BaseModel = {
	id: 'id',

	createdAt: 'created_at',
	createdBy: 'created_by',
	updatedAt: 'updated_at',
	updatedBy: 'updated_by',
	deletedAt: 'deleted_at',
	deletedBy: 'updated_by',
};

const UserTable = {
	...BaseModel,
	firstName: 'first_name',
	fullName: 'full_name',
	email: 'email',
	password: 'password',
};

const ProductTable = {
	...BaseModel,
	name: 'name',
	code: 'code',
	thumbnail: 'thumbnail',
	description: 'description',

	seenCount: 'seen_count',
	specId: 'spec_id',

	brandId: 'brand_id',
	menuId: 'menu_id',

	unit: 'unit',
	images: 'images',
	inventoryCount: 'inventoryCount',
	reservedCount: 'reservedCound',
	price: 'price',
	salePrice: 'sale_price',
	discount: 'discount',
	allowSale: 'allow_sale',
	specTypeId: 'spec_type_id',
	tagIds: 'tag_ids'
};

const SpecTypeTable = {
	...BaseModel,
	name: 'name',
	useBuildPc: 'use_build_pc',
};

const ProductCategoryTable = {
	productId: 'product_id',
	categoryId: 'category_id',
	createdAt: 'created_at',
	createdBy: 'created_by',
};

const MenuTable = {
	...BaseModel,
	name: 'name',
	parentId: 'parent_id',
};

const CategoryTable = {
	...BaseModel,
	name: 'name',
	menuId: 'menu_id',
	metadata: 'metadata',
	position: 'position'
};

const BrandTable = {
	...BaseModel,
	name: 'name',
	metadata: 'metadata',
};

const TagTable = {
	...BaseModel,
	name: 'name',
};

const CollectionTable = {
	...BaseModel,
	name: 'name',
	slug: 'slug',
	productIds: 'product_ids',
};

const SpecNameTable = {
	...BaseModel,
	name: 'name',
	required: 'required',
	specTypeId: 'spec_type_id',
	position: 'position',
};

const SpecValueTable = {
	...BaseModel,
	value: 'value',
	productId: 'product_id',
	specPartId: 'spec_part_id',
};

const GeneralInfoTable = {
	...BaseModel,
	phones: 'phones',
	bankAccounts: 'bank_accounts',
};

export {
	UserTable,
	ProductTable,
	ProductCategoryTable,
	MenuTable,
	CategoryTable,
	BrandTable,
	SpecTypeTable,
	SpecNameTable,
	SpecValueTable,
	GeneralInfoTable,
	CollectionTable,
	TagTable
};

export default Tables;
