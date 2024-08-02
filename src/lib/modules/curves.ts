type Point = { x: number, y: number };

export function checkLineIntersection(p1: Point, p2: Point, q1: Point, q2: Point) {
    var det, gamma, lambda;
    det = (p2.x - p1.x) * (q2.y - q1.y) - (q2.x - q1.x) * (p2.y - p1.y);
    if (det === 0) {
        return false;
    } else {
        lambda = ((q2.y - q1.y) * (q2.x - p1.x) + (q1.x - q2.x) * (q2.y - p1.y)) / det;
        gamma = ((p1.y - p2.y) * (q2.x - p1.x) + (p2.x - p1.x) * (q2.y - p1.y)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

export function checkCurveIntersection(p0: Point, p1: Point, p2: Point, l0: Point, l1: Point): boolean {
    if (l0.x === l1.x && l0.y === l1.y) return false;

    // Calculate the coefficients of the Bezier curve
    const A = {
        x: p0.x - 2 * p1.x + p2.x,
        y: p0.y - 2 * p1.y + p2.y
    };
    const B = {
        x: 2 * (p1.x - p0.x),
        y: 2 * (p1.y - p0.y)
    };
    const C = {
        x: p0.x,
        y: p0.y
    };

    // Calculate the line coefficients
    const D = {
        x: l1.x - l0.x,
        y: l1.y - l0.y
    };
    const E = {
        x: l0.x,
        y: l0.y
    };

    // Calculate the intersection coefficients
    const a = D.y * A.x - D.x * A.y;
    const b = D.y * B.x - D.x * B.y;
    const c = D.y * (C.x - E.x) - D.x * (C.y - E.y);

    // Solve the quadratic equation at^2 + bt + c = 0
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        // No intersection
        return false;
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b + sqrtDiscriminant) / (2 * a);
    const t2 = (-b - sqrtDiscriminant) / (2 * a);

    // Check if either solution is within the range [0, 1]
    if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)) {
        // Find the corresponding u values
        const calculateU = (t: number) => {
            if (D.x !== 0) {
                return (A.x * t * t + B.x * t + C.x - E.x) / D.x;
            } else {
                return (A.y * t * t + B.y * t + C.y - E.y) / D.y;
            }
        };

        const u1 = calculateU(t1);
        const u2 = calculateU(t2);

        // Check if either u value is within the range [0, 1]
        if ((u1 >= 0 && u1 <= 1) || (u2 >= 0 && u2 <= 1)) {
            return true;
        }
    }

    return false;
}
