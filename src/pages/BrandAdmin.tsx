import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Flag, Hotel, Utensils, PartyPopper, ShoppingBag } from "lucide-react";

const BrandAdmin = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Golf Clubs",
      path: "/admin/golf",
      icon: Flag,
      description: "Manage golf club offers and amenities"
    },
    {
      name: "Hotels",
      path: "/admin/hotels",
      icon: Hotel,
      description: "Manage hotel offers and accommodations"
    },
    {
      name: "Dining",
      path: "/admin/dining",
      icon: Utensils,
      description: "Manage restaurant and dining offers"
    },
    {
      name: "Entertainment",
      path: "/admin/entertainment",
      icon: PartyPopper,
      description: "Manage entertainment and activity offers"
    },
    {
      name: "Lifestyle",
      path: "/admin/lifestyle",
      icon: ShoppingBag,
      description: "Manage lifestyle and shopping offers"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Offer Management</h1>
        <p className="text-muted-foreground">
          Select a category to manage offers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(category.path)}
                  variant="orange"
                  className="w-full"
                >
                  Manage {category.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BrandAdmin;
